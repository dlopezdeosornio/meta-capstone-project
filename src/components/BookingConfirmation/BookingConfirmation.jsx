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
        <div className="booking-confirmation-container">
            <div className="booking-confirmation-image">
                <img src={require('../../assets/Icons/booking-confirmation.png')} alt="Booking Confirmation" />
            </div>
            <div className="booking-confirmation">
                <h1>You have successfully booked your table!</h1>
                <p>Please check your email for the confirmation.</p>
            </div>
            <div className="booking-confirmation-details">
                <h2>Booking Details</h2>
                <p>Date: {date}</p>
                <p>Time: {time}</p>
                <p>Number of Guests: {numberOfGuests}</p>
                <p>Occasion: {occasion}</p>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
            </div>
            <div className="booking-cancel-button">
                <button onClick={handleCancelReservation}>Cancel Reservation</button>
            </div>
        </div>
    );
}

export default BookingConfirmation;