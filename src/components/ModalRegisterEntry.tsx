import React from 'react'
import { useContextStore } from '../store';
import ModalBoostrap from './Modal';

function ModalRegisterEntry() {
    const { registerEntryState, closeModalRegisterEntry, setRegisterEntry } = useContextStore()
    return (
        <ModalBoostrap
            show={registerEntryState.show}
            handleClose={closeModalRegisterEntry}
            title="Vehículo Registrado"
            actions={[
                {
                    label: "Registrar Entrada",
                    callback: () => registerEntryState.vehicle && setRegisterEntry(registerEntryState.vehicle),
                    color: "success"
                }
            ]}
        >
            <div>
                <p>¿Desea Registrar entrada?</p>
            </div>
        </ModalBoostrap>
    )
}

export default ModalRegisterEntry