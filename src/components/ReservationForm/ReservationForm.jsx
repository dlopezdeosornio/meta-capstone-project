import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './reservationForm.css';
import { fetchAPI, submitAPI } from '../../api';

const ReservationForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    occasion: '',
    numberOfPeople: '',
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [showCancellationMessage, setShowCancellationMessage] = useState(false);

  // Add useEffect to handle initial setup
  useEffect(() => {
    // Check for cancellation notification
    const cancelled = searchParams.get('cancelled');
    if (cancelled === 'true') {
      setShowCancellationMessage(true);
      // Clear the URL parameter after showing the message
      navigate('/reserve', { replace: true });
    }

    // Set today's date as default and fetch available times
    const today = new Date().toISOString().split('T')[0];
    setFormData(prevData => ({
      ...prevData,
      date: today
    }));
    
    // Fetch available times for today
    const selectedDate = new Date(today + 'T00:00:00');
    const times = fetchAPI(selectedDate);
    

    
    // Filter out times that have already passed using UTC time
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();
    
    const filteredTimes = times.filter(time => {
      const [hours, minutes] = time.split(':').map(Number);
      
      // Convert to UTC for comparison
      const timeToCheck = new Date();
      timeToCheck.setUTCHours(hours, minutes, 0, 0);
      
      // Check if the time is in the future
      if (hours > currentHour) {
        return true; // Future hour
      } else if (hours === currentHour && minutes > currentMinute) {
        return true; // Same hour but future minute
      }
      return false; // Past time
    });
    

    setAvailableTimes(filteredTimes);
  }, [searchParams, navigate]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.numberOfPeople) {
      newErrors.numberOfPeople = 'Number of people is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Additional validation for same-day reservations
    if (formData.date && formData.time) {
      const selectedDate = new Date(formData.date + 'T00:00:00');
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();
      
      if (isToday) {
        const [hours, minutes] = formData.time.split(':').map(Number);
        const selectedTime = new Date();
        selectedTime.setHours(hours, minutes, 0, 0);
        
        if (selectedTime <= today) {
          newErrors.time = 'Please select a future time for today';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the API to submit the reservation
      const result = await submitAPI(formData);
      
      if (result.success) {
        console.log('Reservation submitted:', formData);
        
        // Navigate to confirmation page with form data as URL parameters
        const params = new URLSearchParams({
          date: formData.date,
          time: formData.time,
          occasion: formData.occasion,
          numberOfPeople: formData.numberOfPeople,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        });
        
        // Navigate to confirmation page
        navigate(`/booking-confirmation?${params.toString()}`);
        
        // Note: Form will be reset when user navigates away, so no need to reset here

      } else {
        alert(result.message);
        // Reset time selection if the slot is no longer available
        setFormData(prevData => ({
          ...prevData,
          time: ''
        }));
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('There was an error submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    


    setFormData(prevData => ({
      ...prevData,
      date: value,
      time: '' // Reset time when date changes
    }));
    
    if (errors.date) {
      setErrors(prevErrors => ({
        ...prevErrors,
        date: ''
      }));
    }
    
    // Fetch available times for the selected date
    if (value) {
      setIsLoadingTimes(true);
      
      // Simulate a small delay to show loading state
      setTimeout(() => {
        const selectedDate = new Date(value + 'T00:00:00');
        const times = fetchAPI(selectedDate);
        

        
        // Filter out times that have already passed if it's today
        const now = new Date();
        const isToday = selectedDate.toDateString() === now.toDateString();
        
        if (isToday) {
          // For today, only show future time slots based on current UTC time
          const currentHour = now.getUTCHours();
          const currentMinute = now.getUTCMinutes();
          
          const filteredTimes = times.filter(time => {
            const [hours, minutes] = time.split(':').map(Number);
            
            // Convert to UTC for comparison
            const timeToCheck = new Date();
            timeToCheck.setUTCHours(hours, minutes, 0, 0);
            
            // Check if the time is in the future
            if (hours > currentHour) {
              return true; // Future hour
            } else if (hours === currentHour && minutes > currentMinute) {
              return true; // Same hour but future minute
            }
            return false; // Past time
          });
          

          setAvailableTimes(filteredTimes);
        } else {
          // For future dates, show all available times
          setAvailableTimes(times);
        }
        
        setIsLoadingTimes(false);
      }, 300);
    } else {
      setAvailableTimes([]);
      setIsLoadingTimes(false);
    }
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      time: value
    }));
    
    if (errors.time) {
      setErrors(prevErrors => ({
        ...prevErrors,
        time: ''
      }));
    }
  };


  // Function to open the date picker when clicking on the date input
  const openDatePicker = () => {
    const dateInput = document.getElementById('date');
    if (dateInput) {
      dateInput.showPicker();
    }
  };

  return (
    <div className="reserve-table-container">
      <div className="reserve-table-content">
        <h1>Reserve a Table</h1>
        <p>Book your perfect dining experience with us</p>
        
        {/* Cancellation notification */}
        {showCancellationMessage && (
          <div className="cancellation-notification">
            <p>Your reservation has been successfully cancelled.</p>
            <button 
              className="close-notification-btn" 
              onClick={() => setShowCancellationMessage(false)}
            >
              ×
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              onClick={openDatePicker}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              required
              className={`form-input ${errors.date ? 'error' : ''}`}
              style={{ cursor: 'pointer' }}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <div className="time-radio-group">
              {!formData.date ? (
                <p className="time-placeholder">Please select a date first</p>
              ) : isLoadingTimes ? (
                <p className="time-placeholder">Loading available times...</p>
              ) : availableTimes.length === 0 ? (
                <p className="time-placeholder">No available times for this date</p>
              ) : (
                <>
                  <p className="time-availability-note">
                    Available times for {formData.date} (times may vary daily)
                  </p>
                  {/* <p className="time-count-note">
                    {availableTimes.length} time slots available {formData.date === new Date().toISOString().split('T')[0] ? 'for today (filtered by current UTC time)' : 'for this date'}
                  </p> */}

                  {/* Separate lunch and dinner times */}
                  {(() => {
                    const lunchTimes = availableTimes.filter(time => {
                      const hour = parseInt(time.split(':')[0]);
                      return hour >= 12 && hour <= 14;
                    });
                    
                    const dinnerTimes = availableTimes.filter(time => {
                      const hour = parseInt(time.split(':')[0]);
                      return hour >= 20 && hour <= 22;
                    });
                    
                    return (
                      <div className="meal-periods-container">
                        {/* Lunch Section */}
                        {lunchTimes.length > 0 && (
                          <div className="meal-period-section lunch">
                            <div className="meal-period-header lunch">
                              Lunch (12:00 PM - 2:00 PM)
                            </div>
                            <div className="meal-period-times">
                              {lunchTimes.map((time) => (
                                <div key={time} className="radio-option">
                                  <input
                                    type="radio"
                                    id={`time-${time}`}
                                    name="time"
                                    value={time}
                                    checked={formData.time === time}
                                    onChange={handleTimeChange}
                                    className="radio-input"
                                  />
                                  <label htmlFor={`time-${time}`} className="radio-label">
                                    {time}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Dinner Section */}
                        {dinnerTimes.length > 0 && (
                          <div className="meal-period-section dinner">
                            <div className="meal-period-header dinner">
                              Dinner (8:00 PM - 10:00 PM)
                            </div>
                            <div className="meal-period-times">
                              {dinnerTimes.map((time) => (
                                <div key={time} className="radio-option">
                                  <input
                                    type="radio"
                                    id={`time-${time}`}
                                    name="time"
                                    value={time}
                                    checked={formData.time === time}
                                    onChange={handleTimeChange}
                                    className="radio-input"
                                  />
                                  <label htmlFor={`time-${time}`} className="radio-label">
                                    {time}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion (Optional)</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select an occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business Meeting</option>
              <option value="date">Date Night</option>
              <option value="family">Family Gathering</option>
              <option value="celebration">Celebration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfPeople">Number of People *</label>
            <select
              id="numberOfPeople"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleInputChange}
              required
              className={`form-input ${errors.numberOfPeople ? 'error' : ''}`}
            >
              <option value="">Select number of people</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
            {errors.numberOfPeople && <span className="error-message">{errors.numberOfPeople}</span>}
          </div>

          {/* Contact Information Section */}
          <div className="form-contact-section">
            <h3 className="form-contact-section-title">Contact Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <p className="required-fields-note">* indicates required fields</p>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Reserve Table'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;