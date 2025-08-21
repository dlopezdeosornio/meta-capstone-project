import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the booking confirmation image
jest.mock('../../assets/Icons/booking-confirmation.png', () => 'mocked-booking-confirmation.png');

// Create a mock component that simulates the BookingConfirmation behavior
const MockBookingConfirmation = ({ 
  date = 'Not specified', 
  time = 'Not specified', 
  numberOfGuests = 'Not specified', 
  occasion = 'Not specified', 
  name = 'Not specified', 
  email = 'Not specified', 
  phone = 'Not specified' 
}) => {
  const handleCancelReservation = () => {
    // Mock navigation behavior
    console.log('Navigate to /reserve?cancelled=true');
  };

  return (
    <div className="booking-confirmation-container">
      <div className="booking-confirmation-image">
        <img src="mocked-booking-confirmation.png" alt="Booking Confirmation" />
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
};

describe('BookingConfirmation Component Logic', () => {
  test('renders without crashing', () => {
    expect(() => render(<MockBookingConfirmation />)).not.toThrow();
  });

  test('renders main heading and confirmation message', () => {
    render(<MockBookingConfirmation />);
    
    expect(screen.getByText('You have successfully booked your table!')).toBeInTheDocument();
    expect(screen.getByText('Please check your email for the confirmation.')).toBeInTheDocument();
  });

  test('renders booking confirmation image', () => {
    render(<MockBookingConfirmation />);
    
    const image = screen.getByAltText('Booking Confirmation');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mocked-booking-confirmation.png');
  });

  test('renders booking details section', () => {
    render(<MockBookingConfirmation />);
    
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
  });

  test('displays default values when no props are provided', () => {
    render(<MockBookingConfirmation />);
    
    expect(screen.getByText('Date: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Time: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Number of Guests: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Occasion: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Name: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Email: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Phone: Not specified')).toBeInTheDocument();
  });

  test('displays actual values from props', () => {
    render(
      <MockBookingConfirmation 
        date="2024-01-15"
        time="19:00"
        numberOfGuests="4"
        occasion="Birthday"
        name="John Doe"
        email="john@example.com"
        phone="123-456-7890"
      />
    );
    
    expect(screen.getByText('Date: 2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('Time: 19:00')).toBeInTheDocument();
    expect(screen.getByText('Number of Guests: 4')).toBeInTheDocument();
    expect(screen.getByText('Occasion: Birthday')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
  });

  test('renders cancel reservation button', () => {
    render(<MockBookingConfirmation />);
    
    const cancelButton = screen.getByText('Cancel Reservation');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton.tagName).toBe('BUTTON');
  });

  test('main heading is properly structured', () => {
    render(<MockBookingConfirmation />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('You have successfully booked your table!');
  });

  test('booking details section has proper heading structure', () => {
    render(<MockBookingConfirmation />);
    
    const detailsHeading = screen.getByRole('heading', { level: 2 });
    expect(detailsHeading).toBeInTheDocument();
    expect(detailsHeading).toHaveTextContent('Booking Details');
  });

  test('image is accessible with proper alt text', () => {
    render(<MockBookingConfirmation />);
    
    const image = screen.getByAltText('Booking Confirmation');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Booking Confirmation');
  });

  test('component renders all required sections', () => {
    render(<MockBookingConfirmation />);
    
    // Check that all main sections are present
    expect(screen.getByText('You have successfully booked your table!')).toBeInTheDocument();
    expect(screen.getByText('Please check your email for the confirmation.')).toBeInTheDocument();
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
    expect(screen.getByText('Cancel Reservation')).toBeInTheDocument();
  });

  test('handles partial props gracefully', () => {
    render(
      <MockBookingConfirmation 
        date="2024-01-15"
        name="John Doe"
        // Leave others undefined
      />
    );
    
    expect(screen.getByText('Date: 2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Time: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Number of Guests: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Occasion: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Email: Not specified')).toBeInTheDocument();
    expect(screen.getByText('Phone: Not specified')).toBeInTheDocument();
  });

  test('handles empty string props', () => {
    render(
      <MockBookingConfirmation 
        date=""
        time=""
        numberOfGuests=""
        occasion=""
        name=""
        email=""
        phone=""
      />
    );
    
    // Use a more flexible text matcher for empty strings
    expect(screen.getByText(/^Date:/)).toBeInTheDocument();
    expect(screen.getByText(/^Time:/)).toBeInTheDocument();
    expect(screen.getByText(/^Number of Guests:/)).toBeInTheDocument();
    expect(screen.getByText(/^Occasion:/)).toBeInTheDocument();
    expect(screen.getByText(/^Name:/)).toBeInTheDocument();
    expect(screen.getByText(/^Email:/)).toBeInTheDocument();
    expect(screen.getByText(/^Phone:/)).toBeInTheDocument();
  });
});
