import React from "react";
import { useContextStore } from "../store";
import { Vehicle } from "../utils/types";

interface ButtonRegisterTypes {
    vehicle: Vehicle,
    fullWidth?: boolean
}


const ButtonRegister = ({ vehicle, fullWidth }: ButtonRegisterTypes): JSX.Element => {
    const { setRegisterEntry, setRegisterExit } = useContextStore()
    const { active } = vehicle
    return (
        <button className={`btn btn-info btn-sm ${fullWidth && "flex-fill"}`} onClick={() => !active ? setRegisterEntry(vehicle) : setRegisterExit(vehicle)}>
            Registrar {active ? "Salida" : "Entrada"}
        </button>
    )
}

export default ButtonRegister