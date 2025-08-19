import React, { useState } from 'react';
import './reserveATable.css';

const ReserveATable = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    occasion: '',
    numberOfPeople: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Reservation submitted successfully!');
  };

  // Generate time options from 11:00 AM to 10:00 PM
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 11; hour <= 22; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      times.push(time);
    }
    return times;
  };

  // Generate date options for the next 30 days
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="reserve-table-container">
      <div className="reserve-table-content">
        <h1>Reserve a Table</h1>
        <p>Book your perfect dining experience with us</p>
        
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <select
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="form-input"
            >
              <option value="">Select a date</option>
              {generateDateOptions().map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="form-input"
            >
              <option value="">Select a time</option>
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
              className="form-input"
            >
              <option value="">Select number of people</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Reserve Table
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReserveATable;
