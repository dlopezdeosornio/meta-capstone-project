import React, { useState } from 'react';
import './reservationForm.css';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    occasion: '',
    numberOfPeople: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Reservation submitted:', formData);
      alert('Reservation submitted successfully!');
      
      // Reset form after successful submission
      setFormData({
        date: '',
        time: '',
        occasion: '',
        numberOfPeople: ''
      });
      setErrors({});
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

// ... existing code ...

  // Generate time options from 12:00 PM to 2:00 PM and 8:00 PM to 10:00 PM
  const generateTimeOptions = (selectedDate) => {
    const times = [];
    const now = new Date();
    const selectedDateTime = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;
    
    // Check if selected date is today by comparing date strings
    const isToday = selectedDateTime && selectedDateTime.toDateString() === now.toDateString();
    
    // Morning/Afternoon times (12:00 PM to 2:00 PM)
    for (let hour = 12; hour <= 14; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // If it's today, check if the time has already passed
        if (isToday) {
          const timeToCheck = new Date();
          timeToCheck.setHours(hour, minute, 0, 0);
          if (timeToCheck > now) {
            times.push({ value: timeValue, label: time });
          }
        } else {
          // For future dates, include all times
          times.push({ value: timeValue, label: time });
        }
      }
    }
    
    // Evening times (8:00 PM to 10:00 PM)
    for (let hour = 20; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // If it's today, check if the time has already passed
        if (isToday) {
          const timeToCheck = new Date();
          timeToCheck.setHours(hour, minute, 0, 0);
          if (timeToCheck > now) {
            times.push({ value: timeValue, label: time });
          }
        } else {
          // For future dates, include all times
          times.push({ value: timeValue, label: time });
        }
      }
    }
    
    return times;
  };

// ... existing code ...

  // Get available times for the selected date
  const availableTimes = generateTimeOptions(formData.date);

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
              ) : availableTimes.length === 0 ? (
                <p className="time-placeholder">No available times for this date</p>
              ) : (
                availableTimes.map((time) => (
                  <div key={time.value} className="radio-option">
                    <input
                      type="radio"
                      id={`time-${time.value}`}
                      name="time"
                      value={time.value}
                      checked={formData.time === time.value}
                      onChange={handleTimeChange}
                      className="radio-input"
                    />
                    <label htmlFor={`time-${time.value}`} className="radio-label">
                      {time.label}
                    </label>
                  </div>
                ))
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