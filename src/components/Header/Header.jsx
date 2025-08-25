import React from "react";
import "./header.css";
import bruschettaImage from "../../assets/Dishes/bruscheta1Big.jpg"
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <header className="header" role="banner">
            <div className="header-container">
                <div className="header-content">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>We are family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <button className="reserve-btn" onClick={() => navigate('/reserve')}>Reserve a Table</button>
                </div>
                <div className="header-image">
                    <img src={bruschettaImage} alt="Delicious bruschetta appetizers on a serving plate" />
                </div>
            </div>
        </header>
    )
}

export default Header;