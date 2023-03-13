import { ResponseType } from 'axios';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { LogType, ModalState, StoreContextType, TypesVehicles, Vehicle, typeVehicles } from '../utils/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getTimeAmountByType } from '../utils/commonFunctions';

const initialStore: StoreContextType = {
    loading: false,
    listVehicles: [],
    setVehicle: () => { },
    registerEntryState: {
        show: false,
    },
    closeModalRegisterEntry: () => { },
    setRegisterEntry: () => { },
    setRegisterExit: () => { },
    startMonth: () => { },
    getDetailsVehicle: () => { },
}

export const StoreContext = createContext<StoreContextType>(initialStore);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(false)
    const [listVehicles, setListVehicles] = useState<Vehicle[]>([]);
    const [registerEntryState, setRegisterEntryState] = useState<ModalState>(initialStore.registerEntryState)

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
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const getDetailsVehicle = async (id: number) => {
        const { data: vehicle } = await axios.get(`vehicles/${id}`)
    }

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
            getDetailsVehicle
        }}
        >
            {children}
        </StoreContext.Provider>
    )
};

export const useContextStore = (): StoreContextType => useContext(StoreContext);


export default StoreProvider