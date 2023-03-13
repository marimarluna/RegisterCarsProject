import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ButtonRegister from '../../components/ButtonRegister'
import TablePays from '../../components/TablePays'
import { useContextStore } from '../../store'
import TableLogs from '../../components/TableLogs';

const DetailsVehicle = () => {
    const { id } = useParams()
    const { getDetailsVehicle, detailsVehicle, handleModalStateDelete } = useContextStore()
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
    const { totalPays, totalTime, listPayLogs, totalTimeMonth, listLogsMonth, ...vehicle } = detailsVehicle
    return (
        <div className='contentScreen container justify-content-start mt-2'>
            <h1>Detalles del vehículo {detailsVehicle?.plate.toUpperCase()} - {detailsVehicle.typeVehicle} </h1>
            <div className='mb-3 d-flex gap-2'>
                <ButtonRegister vehicle={vehicle} />
                <button className='btn btn-danger btn-sm' onClick={() => handleModalStateDelete(vehicle)}>Eliminar</button>
            </div>
            <div className="row">
                <div className='col border-end px-3'>
                    <div className='d-flex justify-content-between'>
                        <h4>Pagos</h4>
                        <div className='text-end'>
                            <p>Total: <b>$ {totalPays.toFixed(2)}</b></p>
                            <p>Tiempo total: <b>{totalTime}</b></p>
                        </div>
                    </div>
                    <TablePays data={listPayLogs} />
                </div>
                <div className='col'>
                    <div className='d-flex justify-content-between'>
                        <h4>Entradas este mes</h4>
                        <p>Minutos en el mes: <b>{totalTimeMonth}</b></p>
                    </div>
                    <TableLogs data={listLogsMonth} />
                </div>
            </div>
        </div>
    )
}

export default DetailsVehicle