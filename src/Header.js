import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <header>
            <h1 className='logo'>COVID-19 Tracker Dashboard</h1>
            <nav>
                <ul className='nav__links'>
                    <li> 
                        <Link to="/"> 
                            <button className="button-55 ">Home</button>
                        </Link>
                     </li>
                    <li>
                        <Link to="/global">
                            <button className="button-55">Global Stats</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header