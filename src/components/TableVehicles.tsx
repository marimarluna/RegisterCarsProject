import React, { ReactElement } from "react"
import Table from 'react-bootstrap/Table';
import { useContextStore } from "../store";
import { Vehicle } from '../utils/types';
import { Link } from 'react-router-dom';

interface TableTypes {
  data: Array<Vehicle>
}

const TableVehicles = ({ data = [] }: TableTypes): ReactElement => {
  const { setRegisterEntry, setRegisterExit } = useContextStore()
  if (!data.length) {
    return (
      <div>
        <h3>Aún no se han registrado vehículos</h3>
        <Link className="btn btn-primary btn-lg" to="/register">
          Registrar vehículo
        </Link>
      </div>

    )
  }
  return (
    <Table responsive="sm" hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Placa</th>
          <th>Tipo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((vehicle) => {
          const { id, plate, typeVehicle, active } = vehicle
          return (
            <tr key={`table-vehicle-row-${id}`}>
              <td>{id}</td>
              <td>{plate.toUpperCase()}</td>
              <td>{typeVehicle}</td>
              <td>
                <div className="d-flex flex-wrap gap-1 ">
                  <button className="btn btn-info btn-sm flex-fill" onClick={() => !active ? setRegisterEntry(vehicle) : setRegisterExit(vehicle)}>
                    Registrar {active ? "Salida" : "Entrada"}
                  </button>
                  <button className="btn btn-info btn-sm flex-fill">Detalles</button>
                  <button className="btn btn-danger btn-sm flex-fill">Eliminar</button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody >
    </Table >
  );
}

export default TableVehicles;