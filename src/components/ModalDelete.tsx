import React from 'react'
import { useContextStore } from '../store';
import ModalBoostrap from './Modal';

function ModalDeleteVehicle() {
    const { deleteVehicleState, closeModalDeleteVehicle, deleteVehicle } = useContextStore()
    return (
        <ModalBoostrap
            show={deleteVehicleState.show}
            handleClose={closeModalDeleteVehicle}
            title="Eliminar Vehículo"
            actions={[
                {
                    label: "Eliminar Vehículo",
                    callback: () => deleteVehicleState.vehicle?.id && deleteVehicle(deleteVehicleState.vehicle.id),
                    color: "danger"
                }
            ]}
        >
            <div>
                <p>¿Desea eliminar el vehículo con la placa <b>{deleteVehicleState.vehicle?.plate.toUpperCase()}</b> y toda la información relacionada?</p>
            </div>
        </ModalBoostrap>
    )
}

export default ModalDeleteVehicle