import { ReactElement } from "react"
import Table from 'react-bootstrap/Table';
import { Vehicle } from '../utils/types';
import { Link } from 'react-router-dom';
import ButtonRegister from './ButtonRegister';
import { useContextStore } from "../store";

interface TableTypes {
  data: Array<Vehicle>
}

const TableVehicles = ({ data = [] }: TableTypes): ReactElement => {
  const { handleModalStateDelete } = useContextStore()
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
          const { id, plate, typeVehicle } = vehicle
          return (
            <tr key={`table-vehicle-row-${id}`}>
              <td>{id}</td>
              <td>{plate.toUpperCase()}</td>
              <td>{typeVehicle}</td>
              <td>
                <div className="d-flex flex-wrap gap-1 ">
                  <ButtonRegister vehicle={vehicle} fullWidth />
                  <Link to={`/detail/${id}`} className="btn btn-info btn-sm flex-fill">Detalles</Link>
                  <button className="btn btn-danger btn-sm flex-fill" onClick={() => handleModalStateDelete(vehicle)}>Eliminar</button>
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