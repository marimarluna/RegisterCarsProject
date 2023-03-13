import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ButtonRegister from '../../components/ButtonRegister'
import TablePays from '../../components/TablePays'
import { useContextStore } from '../../store'
import TableLogs from '../../components/TableLogs';

const DetailsVehicle = () => {
    const { id } = useParams()
    const { getDetailsVehicle, detailsVehicle } = useContextStore()
    useEffect(() => {
        getDetailsVehicle(Number(id))
    }, [])
    if (!detailsVehicle) {
        return (
            <div>
                loading...
            </div>
        )
    }
    return (
        <div className='contentScreen container justify-content-start mt-2'>
            <h1>Detalles del vehículo {detailsVehicle?.plate.toUpperCase()} - {detailsVehicle.typeVehicle} </h1>
            <div className='mb-3 d-flex gap-2'>
                <ButtonRegister vehicle={detailsVehicle} />
                <button>Eliminar</button>
            </div>
            <div className='d-flex gap-3 flex-wrap'>
                <div className='flex-fill border-end px-3'>
                    <div className='d-flex justify-content-between'>
                        <h4>Pagos</h4>
                        <div className='text-end'>
                            <p>Total: <b>$ {detailsVehicle.totalPays.toFixed(2)}</b></p>
                            <p>Tiempo total: <b>{detailsVehicle.totalTime}</b></p>
                        </div>
                    </div>
                    <TablePays data={detailsVehicle.listPayLogs} />
                </div>
                <div className='flex-fill'>
                    <div className='d-flex justify-content-between'>
                        <h4>Entradas este mes</h4>
                        <p>Minutos en el mes: <b>{detailsVehicle.totalTimeMonth}</b></p>
                    </div>
                    <TableLogs data={detailsVehicle.listLogsMonth} />
                </div>
            </div>
        </div>
    )
}

export default DetailsVehicle