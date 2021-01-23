import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    // Nav Click Function
    const navClick = () => {
        const burger = document.querySelector('.nav__burger');
        const nav = document.querySelector('.nav__links');
        // If link clicked and burger not being displayed, exit the function
        if (window.getComputedStyle(burger).display === "none") return;
        // Toggle Nav
        nav.classList.toggle('nav-active');
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav__logo">
                    <Link to="/" className="nav__logo--link">iRosary</Link>
                </div>
                <div className="nav__burger" onClick={navClick}>
                    <div className="nav__burger-line1"></div>
                    <div className="nav__burger-line2"></div>
                    <div className="nav__burger-line3"></div>
                </div>
                <ul className="nav__links">
                    <li><Link to="/" className="nav__links-link" onClick={navClick}>Mysteries</Link></li>
                    <li><Link to="#" className="nav__links-link" onClick={navClick}>About</Link></li>
                    <li><Link to="#" className="nav__links-link" onClick={navClick}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;