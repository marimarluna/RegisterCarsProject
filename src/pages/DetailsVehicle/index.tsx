import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContextStore } from '../../store'

const DetailsVehicle = () => {
    const { id } = useParams()
    const { getDetailsVehicle, detailsVehicle } = useContextStore()
    useEffect(() => {
        getDetailsVehicle(Number(id))
    })
    return (
        <div className='contentScreen'>
        </div>
    )
}

export default DetailsVehicle