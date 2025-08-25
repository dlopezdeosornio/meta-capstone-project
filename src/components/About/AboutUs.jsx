import React from 'react';
import './aboutUs.css';
import chef from '../../assets/Restaurant/chef.avif';
import kitchen from '../../assets/Restaurant/kitchen.webp';

function AboutUs({ id }) {
    return (
        <div className="about-container" id={id}>
            <div className="about-content">
                <div className="about-text">
                    <h1 className="restaurant-title">Little Lemon</h1>
                    <h2 className="restaurant-location">Chicago</h2>
                    <div className="about-description">
                        <p>
                            Little Lemon is owned by two Italian brothers, Mario and Adrian, 
                            who moved to the United States to pursue their shared dream of 
                            owning a restaurant.
                        </p>
                        <p>
                            To craft the menu, Mario relies on family recipes and his experience 
                            as a chef in Italy. Adrian does all the marketing for the restaurant 
                            and led the effort to expand the menu beyond classic Italian to 
                            incorporate additional cuisines from the Mediterranean region.
                        </p>
                    </div>
                </div>
                <div className="about-images">
                    <div className="image-overlay">
                        <img 
                            src={kitchen} 
                            alt="Kitchen details" 
                            className="main-image"
                        />
                        <img 
                            src={chef} 
                            alt="Chefs in kitchen" 
                            className="overlay-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;