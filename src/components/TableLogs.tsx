import React, { ReactElement } from "react"
import Table from 'react-bootstrap/Table';
import { LogType } from '../utils/types';
import { formatterDate } from '../utils/commonFunctions';

interface TableTypes {
    data: Array<LogType>
}

const TableLogs = ({ data = [] }: TableTypes): ReactElement => {
    if (!data.length) {
        return (
            <div className="w-100">
                <h3>Aún no se han registrado entradas este mes</h3>
            </div>

        )
    }
    return (
        <Table responsive="sm" hover >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Fecha de entrada</th>
                    <th>Fecha de salida</th>
                </tr>
            </thead>
            <tbody>
                {data.map((logs) => {
                    const { id, dateEntry, dateExit } = logs
                    return (
                        <tr key={`table-logs-row-${id}`}>
                            <td>{id}</td>
                            <td>{formatterDate(dateEntry)}</td>
                            <td>{dateExit ? formatterDate(dateExit): "No ha registrado salida"}</td>
                        </tr>
                    )
                })}
            </tbody >
        </Table >
    );
}

export default TableLogs;