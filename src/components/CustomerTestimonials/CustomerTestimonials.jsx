import React from 'react';
import './customerTestimonials.css';
import Anna from "../../assets/Customers/customer1.jpg"
import Bruno from "../../assets/Customers/customer2.jpg"
import Gabi from "../../assets/Customers/customer3.jpg"
import Leo from "../../assets/Customers/customer4.webp"

function CustomerTestimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Leo",
            rating: 5,
            testimonial: "I loved the experience at the restaurant! The food was delicious and the service was exceptional. I will definitely be back more often!"
        },
        {
            id: 2,
            name: "Gabi",
            rating: 4,
            testimonial: "I went to the restaurant with my family and we were very pleased with everything. The food was wonderful and the atmosphere was very cozy. I highly recommend it!"
        },
        {
            id: 3,
            name: "Bruno",
            rating: 4,
            testimonial: "I have been to many restaurants, but this one certainly stood out. The quality of the ingredients and the preparation of the dishes were impeccable. Not to mention the presentation, which was beautiful. It was an amazing experience!"
        },
        {
            id: 4,
            name: "Anna",
            rating: 5,
            testimonial: "The restaurant has a great variety of dishes and all the ones I tried were excellent. In addition, the price is fair and the service is very attentive. I will definitely recommend it to my friends."
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : 'outline'}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const imageSrc = {
        Leo: Leo,
        Gabi: Gabi,
        Bruno: Bruno,
        Anna: Anna
    }

    return (
        <div className="about-container">
            <div className="testimonials-section">
                <h2 className="testimonials-title">What our customers say!</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="rating">
                                {renderStars(testimonial.rating)}
                            </div>
                            <div className="profile-section">
                                <div className="profile-picture">
                                    <img src={imageSrc[testimonial.name]} alt={testimonial.name} />
                                </div>
                                <h3 className="customer-name">{testimonial.name}</h3>
                            </div>
                            <p className="testimonial-text">{testimonial.testimonial}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CustomerTestimonials;