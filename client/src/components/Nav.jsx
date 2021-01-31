import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ mysteryStatus, handleActiveMystery }) {
    // Nav Click Function
    const navClick = (menuItem) => {
        console.log(menuItem);
        const burger = document.querySelector('.nav__burger');
        const nav = document.querySelector('.nav__links');
        // If on the login page due to no token, do not respond
        // to a burger click!
        if (localStorage.getItem("token") === null) return;
        // If link clicked and burger not being displayed, exit the function
        if (window.getComputedStyle(burger).display === "none") return;
        // If link clicked and burger is an "X", this means on another
        // "page" and need to close the page and change back to a burger
        if (document.querySelector('.nav__burger-line2').style.opacity === '0') {
            document.querySelector('.nav__burger-line2').style.opacity = 1;
            burger.classList.toggle("toggle");
            nav.classList.toggle('nav-active');
            handleActiveMystery();
        }
        // Toggle Nav
        nav.classList.toggle('nav-active');
        // Mysteries link
        if (menuItem === 'Mysteries') {
            console.log('MYSTERIES');
            burger.classList.toggle('toggle');
            document.querySelector('.nav__burger-line2').style.opacity = 0;
            handleActiveMystery();
        };
        // Logout link
        if (menuItem === 'Logout') {
            localStorage.removeItem('token');
            localStorage.removeItem('r_fname');
        };
    };

    return (
        <header className="header">
            {console.log({ mysteryStatus })}
            <nav className="nav">
                <div className="nav__logo">
                    <Link to="/" className="nav__logo--link">iRosary</Link>
                </div>
                <div className="nav__burger" onClick={navClick}>
                    <div className="nav__burger-line1" id="burger-line1"></div>
                    <div className="nav__burger-line2" id="burger-line2"></div>
                    <div className="nav__burger-line3" id="burger-line3"></div>
                </div>
                <ul className="nav__links">
                    <li><Link to="/" className="nav__links-link"
                        onClick={() => navClick('Mysteries')}>Mysteries</Link>
                    </li>
                    <li><Link to="#" className="nav__links-link" onClick={navClick}>About</Link></li>
                    <li><Link to="/" className="nav__links-link"
                        onClick={() => navClick('Logout')}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;