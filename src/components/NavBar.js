import React from 'react'
import { Link } from 'react-router-dom'
import { useContextStore } from '../store'

function NavBar() {
    const { startMonth } = useContextStore()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/register"}>Registrar vehículos</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" onClick={startMonth} >Comienza mes</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar