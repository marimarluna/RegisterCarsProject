import axios from 'axios'
import React from 'react'
import TableVehicles from '../../components/TableVehicles'
import { useContextStore } from '../../store'

function Home(): JSX.Element {
    const { listVehicles } = useContextStore()
    return (
        <div className="contentScreens container">
            <h1>Bienvenido</h1>
            <TableVehicles data={listVehicles} />
        </div>
    )
}

export default Home