import { ResponseType } from 'axios';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { LogType, ModalState, StoreContextType, TypesVehicles, Vehicle, typeVehicles, DetailsVehicleType, PaysLogs } from '../utils/types';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTimeAmountByType } from '../utils/commonFunctions';
import { differenceInMinutes } from 'date-fns';

const initialStore: StoreContextType = {
    loading: false,
    listVehicles: [],
    setVehicle: () => { },
    registerEntryState: {
        show: false,
    },
    deleteVehicleState: {
        show: false,
    },
    closeModalRegisterEntry: () => { },
    closeModalDeleteVehicle: () => { },
    setRegisterEntry: () => { },
    setRegisterExit: () => { },
    startMonth: () => { },
    getDetailsVehicle: () => { },
    deleteVehicle: () => { },
    handleModalStateDelete: () => { },
}

export const StoreContext = createContext<StoreContextType>(initialStore);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate()
    let location = useLocation();

    const [loading, setLoading] = useState<Boolean>(false)
    const [listVehicles, setListVehicles] = useState<Vehicle[]>([]);
    const [detailsVehicle, setDetailsVehicle] = useState<DetailsVehicleType>()
    const [registerEntryState, setRegisterEntryState] = useState<ModalState>(initialStore.registerEntryState)
    const [deleteVehicleState, setDeleteVehicleState] = useState<ModalState>(initialStore.deleteVehicleState)

    const loadListVehicles = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("vehicles")
            setLoading(false)
            setListVehicles(data)
        } catch (error: any) {
            setLoading(false)
            toast(error.response.data.message)
        }
    }

    useEffect(() => {
        loadListVehicles()
    }, [])

    const setVehicle = async (params: Vehicle) => {
        try {
            setLoading(true)
            const { data } = await axios.post("vehicles", { ...params, active: false })
            setLoading(false)
            toast("Vehiculo Registrado")
            setRegisterEntryState({
                show: true,
                vehicle: data
            })
            navigate("/")
            loadListVehicles()
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const closeModalRegisterEntry = () => setRegisterEntryState(initialStore.registerEntryState)

    const setRegisterEntry = async (params: Vehicle) => {
        try {
            setLoading(true)
            const { data } = await axios.post("logs", { idVehicle: params.id, dateEntry: new Date() });
            const { data: EditVehicle } = await axios.put(`vehicles/${params.id}`, { ...params, active: true })
            toast("Entrada registrada")
            setRegisterEntryState(initialStore.registerEntryState)
            loadListVehicles()
            if(location.pathname.includes("detail") && params.id) {
                getDetailsVehicle(params.id)
            }
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const setRegisterExit = async (params: Vehicle) => {
        try {
            const { data: currentLog } = await axios.get(`logs?idVehicle=${params.id}&_sort=dateEntry&_order=desc`);
            const activeLog = currentLog[0];
            const { data: resLog } = await axios.put(`logs/${activeLog.id}`, { ...activeLog, dateExit: new Date() })
            const { data: EditVehicle } = await axios.put(`vehicles/${params.id}`, { ...params, active: false })
            const { time, amount } = await getTimeAmountByType(EditVehicle, resLog)
            toast("Salida registrada")
            if(location.pathname.includes("detail") && params.id) {
                getDetailsVehicle(params.id)
            }
            loadListVehicles()
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const startMonth = async () => {
        try {
            const { data = [] } = await axios.get('logs');
            const response = Promise.all(data.map(async (item: LogType) => {
                const result = await axios.delete(`logs/${item.id}`)
                if (!item.dateExit) {
                    const { data: vehicle } = await axios.get(`vehicles/${item.idVehicle}`)
                    const { time, amount } = await getTimeAmountByType(vehicle, item)
                    const { data: newLog } = await axios.post(`logs`, { ...item, dateEntry: new Date() })
                }
                return result
            }))
            navigate("/")
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const getDetailsVehicle = async (id: number) => {
        const { data: vehicle } = await axios.get(`vehicles/${id}`)
        const { data: listPayLogs } = await axios.get(`pays?idVehicle=${id}`)
        const { data: listLogsMonth } = await axios.get(`logs?idVehicle=${id}&_sort=dateEntry&_order=desc`)
        const totalPays = listPayLogs.reduce((prev: number, current: PaysLogs) => prev + current.amount, 0)
        const totalTime = listPayLogs.reduce((prev: number, current: PaysLogs) => prev + current.time, 0)
        const totalTimeMonth = listLogsMonth.reduce((prev: number, current: LogType) => {
            const fiDate = current.dateExit ? new Date(current.dateExit) : new Date()
            const timeBetweenDates = differenceInMinutes(fiDate, new Date(current.dateEntry))
            return prev + timeBetweenDates
        }, 0)
        setDetailsVehicle({
            ...vehicle,
            listPayLogs,
            listLogsMonth,
            totalPays,
            totalTime,
            totalTimeMonth
        })
    }

    const deleteVehicle = async (id: number) => {
        try {
            setLoading(true)
            const { data: listPayLogs } = await axios.get(`pays?idVehicle=${id}`)
            const { data: listLogsMonth } = await axios.get(`logs?idVehicle=${id}&_sort=dateEntry&_order=desc`)
            const deletePaysLog = Promise.all(listPayLogs.map(async (item: PaysLogs) => {
                const { data: response } = await axios.delete(`pays/${item.id}`)
                return response
            }))
            const deleteLogs = Promise.all(listLogsMonth.map(async (item: PaysLogs) => {
                const { data: response } = await axios.delete(`logs/${item.id}`)
                return response
            }))
            const { data: vehicle } = await axios.delete(`vehicles/${id}`)
            setLoading(false)
            toast("Se ha eliminado toda la información del vehículo")
            closeModalDeleteVehicle()
            loadListVehicles()
            navigate("/")
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
    
    const handleModalStateDelete = (vehicle: Vehicle) => {
        setDeleteVehicleState({
            show: !deleteVehicleState.show,
            vehicle: vehicle || null
        })
    }

    const closeModalDeleteVehicle = () => setDeleteVehicleState(initialStore.deleteVehicleState)

    return (
        <StoreContext.Provider value={{
            listVehicles,
            loading,
            setVehicle,
            closeModalRegisterEntry,
            registerEntryState,
            setRegisterEntry,
            setRegisterExit,
            startMonth,
            getDetailsVehicle,
            detailsVehicle,
            deleteVehicle,
            deleteVehicleState,
            handleModalStateDelete,
            closeModalDeleteVehicle
        }}
        >
            {children}
        </StoreContext.Provider>
    )
};

export const useContextStore = (): StoreContextType => useContext(StoreContext);


export default StoreProvider