import React, { ReactElement } from "react"
import Table from 'react-bootstrap/Table';
import { PaysLogs } from '../utils/types';
import { formatterDate } from '../utils/commonFunctions';

interface TableTypes {
    data: Array<PaysLogs>
}

const TablePays = ({ data = [] }: TableTypes): ReactElement => {
    if (!data.length) {
        return (
            <div>
                <h3>Aún no se han registrado Pagos</h3>
            </div>

        )
    }
    return (
        <Table responsive="sm" hover >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Tiempo</th>
                </tr>
            </thead>
            <tbody>
                {data.map((logs) => {
                    const { id, date, amount, time } = logs
                    return (
                        <tr key={`table-pays-row-${id}`}>
                            <td>{id}</td>
                            <td>{formatterDate(date)}</td>
                            <td>$ {amount.toFixed(2)}</td>
                            <td>{time}</td>
                        </tr>
                    )
                })}
            </tbody >
        </Table >
    );
}

export default TablePays;