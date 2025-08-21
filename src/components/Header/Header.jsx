import React from "react";
import { Link } from 'react-router-dom';
import logo from "../../assets/Logos/logo.jpg";
import "./header.css";

function Header() {
    return (
        <header className="header" role="banner">
            <div className="logo-container">
                <Link to="/" aria-label="Go to homepage">
                    <img src={logo} alt="Little Lemon Restaurant Logo" className="logo"/>
                </Link>
            </div>
            <h1>Little Lemon</h1>
        </header>
    )
}

export default Header;