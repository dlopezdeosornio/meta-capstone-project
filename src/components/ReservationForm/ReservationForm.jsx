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
  const [touched, setTouched] = useState({});
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

  // Validation rules
  const validationRules = {
    date: (value) => {
      if (!value.trim()) return 'Date is required';
      const selectedDate = new Date(value + 'T00:00:00');
      const today = new Date();
      if (selectedDate < today.setHours(0, 0, 0, 0)) {
        return 'Date cannot be in the past';
      }
      return '';
    },
    time: (value) => {
      if (!value.trim()) return 'Time is required';
      return '';
    },
    numberOfPeople: (value) => {
      if (!value) return 'Number of people is required';
      if (value < 1 || value > 10) return 'Number of people must be between 1 and 10';
      return '';
    },
    name: (value) => {
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters long';
      if (value.trim().length > 50) return 'Name must be less than 50 characters';
      if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
      }
      return '';
    },
    email: (value) => {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      if (value.length > 100) return 'Email must be less than 100 characters';
      return '';
    },
    phone: (value) => {
      if (value.trim()) {
        // Only validate if phone is provided (optional field)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
          return 'Please enter a valid phone number';
        }
        if (value.length > 20) return 'Phone number must be less than 20 characters';
      }
      return '';
    }
  };

  // Real-time validation function
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (rule) {
      return rule(value);
    }
    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
    
    // Validate field on blur
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(fieldName => {
      allTouched[fieldName] = true;
    });
    setTouched(allTouched);
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.form-input.error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the API to submit the reservation
      const result = await submitAPI(formData);
      
      if (result.success) {
        console.log('Reservation submitted:', formData);

        //localStorage.setItem('reservationData', JSON.stringify(formData));
        
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
    
    // Clear time errors when date changes
    setErrors(prevErrors => ({
      ...prevErrors,
      time: ''
    }));
    
    // Mark date as touched and validate
    setTouched(prevTouched => ({
      ...prevTouched,
      date: true
    }));
    
    const error = validateField('date', value);
    setErrors(prevErrors => ({
      ...prevErrors,
      date: error
    }));
    
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
    
    // Mark time as touched and validate
    setTouched(prevTouched => ({
      ...prevTouched,
      time: true
    }));
    
    const error = validateField('time', value);
    setErrors(prevErrors => ({
      ...prevErrors,
      time: error
    }));
  };

  // Check if form is valid for enabling submit button
  const isFormValid = () => {
    return Object.keys(formData).every(fieldName => {
      if (fieldName === 'phone' || fieldName === 'occasion') return true; // Optional fields
      return formData[fieldName] && !errors[fieldName];
    });
  };

  // Function to open the date picker when clicking on the date input
  const openDatePicker = () => {
    const dateInput = document.getElementById('date');
    if (dateInput) {
      dateInput.showPicker();
    }
  };

  return (
    <main className="reserve-table-container" role="main">
      <div className="reserve-table-content">
        <h1>Reserve a Table</h1>
        <p>Book your perfect dining experience with us</p>
        
        {/* Cancellation notification */}
        {showCancellationMessage && (
          <div className="cancellation-notification" role="alert" aria-live="polite">
            <p>Your reservation has been successfully cancelled.</p>
            <button 
              className="close-notification-btn" 
              onClick={() => setShowCancellationMessage(false)}
              aria-label="Close cancellation notification"
            >
              ×
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="reservation-form" aria-label="Table reservation form">
          <fieldset className="form-group">
            <legend className="visually-hidden">Reservation Details</legend>
            
            <div className="form-group">
              <label htmlFor="date">Date <span className="required" aria-label="required">*</span></label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleDateChange}
                onBlur={handleBlur}
                onClick={openDatePicker}
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                required
                className={`form-input ${errors.date ? 'error' : ''} ${touched.date ? 'touched' : ''}`}
                style={{ cursor: 'pointer' }}
                aria-describedby={errors.date ? `date-error` : undefined}
                aria-invalid={errors.date ? 'true' : 'false'}
                aria-required="true"
              />
              {errors.date && (
                <span className="error-message" id="date-error" role="alert" aria-live="polite">
                  {errors.date}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">Time <span className="required" aria-label="required">*</span></label>
              <div className="time-radio-group" role="radiogroup" aria-labelledby="time-label">
                {!formData.date ? (
                  <p className="time-placeholder" id="time-placeholder">Please select a date first</p>
                ) : isLoadingTimes ? (
                  <p className="time-placeholder" id="time-loading" aria-live="polite">Loading available times...</p>
                ) : availableTimes.length === 0 ? (
                  <p className="time-placeholder" id="time-unavailable">No available times for this date</p>
                ) : (
                  <>
                    <p className="time-availability-note" id="time-availability-note">
                      Available times for {formData.date} (times may vary daily)
                    </p>

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
                            <fieldset className="meal-period-section lunch">
                              <legend className="meal-period-header lunch">Lunch (12:00 PM - 2:00 PM)</legend>
                              <div className="meal-period-times" role="radiogroup" aria-labelledby="lunch-legend">
                                {lunchTimes.map((time) => (
                                  <div key={time} className="radio-option">
                                    <input
                                      type="radio"
                                      id={`time-${time}`}
                                      name="time"
                                      value={time}
                                      checked={formData.time === time}
                                      onChange={handleTimeChange}
                                      onBlur={handleBlur}
                                      className="radio-input"
                                      aria-describedby={errors.time ? `time-error` : undefined}
                                      aria-invalid={errors.time ? 'true' : 'false'}
                                      aria-required="true"
                                    />
                                    <label htmlFor={`time-${time}`} className="radio-label">
                                      {time}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </fieldset>
                          )}
                          
                          {/* Dinner Section */}
                          {dinnerTimes.length > 0 && (
                            <fieldset className="meal-period-section dinner">
                              <legend className="meal-period-header dinner">Dinner (8:00 PM - 10:00 PM)</legend>
                              <div className="meal-period-times" role="radiogroup" aria-labelledby="dinner-legend">
                                {dinnerTimes.map((time) => (
                                  <div key={time} className="radio-option">
                                    <input
                                      type="radio"
                                      id={`time-${time}`}
                                      name="time"
                                      value={time}
                                      checked={formData.time === time}
                                      onChange={handleTimeChange}
                                      onBlur={handleBlur}
                                      className="radio-input"
                                      aria-describedby={errors.time ? `time-error` : undefined}
                                      aria-invalid={errors.time ? 'true' : 'false'}
                                      aria-required="true"
                                    />
                                    <label htmlFor={`time-${time}`} className="radio-label">
                                      {time}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </fieldset>
                          )}
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
              {errors.time && (
                <span className="error-message" id="time-error" role="alert" aria-live="polite">
                  {errors.time}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="occasion">Occasion (Optional)</label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="form-input"
                aria-describedby="occasion-help"
              >
                <option value="">Select an occasion</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="business">Business Meeting</option>
                <option value="family">Family Gathering</option>
                <option value="celebration">Celebration</option>
                <option value="other">Other</option>
              </select>
              <span id="occasion-help" className="help-text">Optional: Let us know if you're celebrating a special occasion</span>
            </div>

            <div className="form-group">
              <label htmlFor="numberOfPeople">Number of People <span className="required" aria-label="required">*</span></label>
              <select
                id="numberOfPeople"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`form-input ${errors.numberOfPeople ? 'error' : ''} ${touched.numberOfPeople ? 'touched' : ''}`}
                aria-describedby={errors.numberOfPeople ? `numberOfPeople-error` : undefined}
                aria-invalid={errors.numberOfPeople ? 'true' : 'false'}
                aria-required="true"
              >
                <option value="">Select number of people</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
              {errors.numberOfPeople && (
                <span className="error-message" id="numberOfPeople-error" role="alert" aria-live="polite">
                  {errors.numberOfPeople}
                </span>
              )}
            </div>
          </fieldset>

          {/* Contact Information Section */}
          <fieldset className="form-contact-section">
            <legend className="form-contact-section-title">Contact Information</legend>
            
            <div className="form-group">
              <label htmlFor="name">Full Name <span className="required" aria-label="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`form-input ${errors.name ? 'error' : ''} ${touched.name ? 'touched' : ''}`}
                placeholder="Enter your full name"
                aria-describedby={errors.name ? `name-error` : undefined}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-required="true"
                autoComplete="name"
              />
              {errors.name && (
                <span className="error-message" id="name-error" role="alert" aria-live="polite">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required" aria-label="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`form-input ${errors.email ? 'error' : ''} ${touched.email ? 'touched' : ''}`}
                placeholder="Enter your email address"
                aria-describedby={errors.email ? `email-error` : undefined}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-required="true"
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message" id="email-error" role="alert" aria-live="polite">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form-input ${errors.phone ? 'error' : ''} ${touched.phone ? 'touched' : ''}`}
                placeholder="Enter your phone number"
                aria-describedby={errors.phone ? `phone-error` : undefined}
                aria-invalid={errors.phone ? 'true' : 'false'}
                autoComplete="tel"
              />
              {errors.phone && (
                <span className="error-message" id="phone-error" role="alert" aria-live="polite">
                  {errors.phone}
                </span>
              )}
            </div>
          </fieldset>

          <p className="required-fields-note" id="required-note">* indicates required fields</p>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting || !isFormValid()}
            aria-describedby="required-note"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Reserve Table'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ReservationForm;