import React from "react";
import { Link } from 'react-router-dom';
import logo from "../../assets/Logos/logo.jpg";
import "./header.css";

function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
            </div>
            <h1>Little Lemon</h1>
        </div>
    )
}

export default Header;