import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form';
import InputMask from "react-input-mask";
import ModalBoostrap from '../../components/Modal';
import { useContextStore } from '../../store';
import { regexPlateNumber } from '../../utils/commonFunctions';
import { Vehicle, typeVehicles } from '../../utils/types';

function Register(): ReactElement {
    const { register, handleSubmit, formState: { errors } } = useForm<Vehicle>();
    const { setVehicle } = useContextStore();
    const onSubmit = async (data: Vehicle) => setVehicle(data);
    return (
        <div className="contentScreens">
            <div>
                <h1 className='mb-3'>Registrar un vehículo</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label htmlFor="plate" className="form-label">Número de placa</label>
                        <InputMask type="text" className="form-control"
                            id="plate"
                            maskChar="*"
                            mask="aaa-99999"
                            required {...register("plate", {
                                required: true,
                                pattern: {
                                    value: regexPlateNumber,
                                    message: "El valor debe tener el formato XXX-00000"
                                },
                            })} />
                        <span>{errors.plate?.message}</span>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="typeVehicle" className="form-label">Tipo</label>
                        <select
                            className="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example"
                            id="typeVehicle"
                            required
                            {...register("typeVehicle")}
                        >
                            <option>Selecciona...</option>
                            {typeVehicles.map((item: string) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-customized mt-4">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register