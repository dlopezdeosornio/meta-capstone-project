import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './bookingConfirmation.css';
import { useNavigate } from 'react-router-dom';

function BookingConfirmation() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Get booking data from URL parameters
    const date = searchParams.get('date') || 'Not specified';
    const time = searchParams.get('time') || 'Not specified';
    const numberOfGuests = searchParams.get('numberOfPeople') || 'Not specified';
    const occasion = searchParams.get('occasion') || 'Not specified';
    const name = searchParams.get('name') || 'Not specified';
    const email = searchParams.get('email') || 'Not specified';
    const phone = searchParams.get('phone') || 'Not specified';

    const handleCancelReservation = () => {
        // Navigate to reserve page with cancellation notification
        navigate('/reserve?cancelled=true');
    };

    return (
        <main className="booking-confirmation-container" role="main">
            <div className="booking-confirmation-image">
                <img src={require('../../assets/Icons/booking-confirmation.png')} alt="Booking confirmation illustration" />
            </div>
            <div className="booking-confirmation">
                <h1>You have successfully booked your table!</h1>
                <p>Please check your email for the confirmation.</p>
            </div>
            <section className="booking-confirmation-details" aria-labelledby="booking-details-heading">
                <h2 id="booking-details-heading">Booking Details</h2>
                <dl>
                    <dt>Date:</dt>
                    <dd>{date}</dd>
                    
                    <dt>Time:</dt>
                    <dd>{time}</dd>
                    
                    <dt>Number of Guests:</dt>
                    <dd>{numberOfGuests}</dd>
                    
                    <dt>Occasion:</dt>
                    <dd>{occasion}</dd>
                    
                    <dt>Name:</dt>
                    <dd>{name}</dd>
                    
                    <dt>Email:</dt>
                    <dd>{email}</dd>
                    
                    <dt>Phone:</dt>
                    <dd>{phone}</dd>
                </dl>
            </section>
            <div className="booking-cancel-button">
                <button 
                    onClick={handleCancelReservation}
                    aria-label="Cancel your reservation"
                >
                    Cancel Reservation
                </button>
            </div>
        </main>
    );
}

export default BookingConfirmation;