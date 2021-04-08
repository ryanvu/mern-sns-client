import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.scss';
import { useAuth } from '../../context/auth';

const Header = () => {
    const { user, logout } = useAuth();
    const [showNav, setShowNav] = useState(false);

    const toggle = () => {
        setShowNav(prev => !prev)
    }
    return (
        <header className="header">
            <div className="header__wrap">
                <Link to="/"><h1 className="header__logo">app.</h1></Link>
                {!showNav ? <p className="header__toggle" onClick={toggle}>open</p> : <p className="header__toggle" onClick={toggle}>close</p>}
                {
                    user ? 
                    <div className="header__nav">
                        <span className="header__user">{user.username}</span>
                        <button onClick={logout} className="header__logout">Log Out</button> 
                    </div>
                    :
                    <nav className="header__nav">
                    <NavLink to="/login" className="header__nav-item">Login</NavLink>
                    <NavLink to="/register" className="header__nav-item">Register</NavLink>
                    </nav>
                }
            </div>

            
        </header>
    )
}

export default Header
