const seededRandom = function (seed) {
  var m = 2**35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = s * a % m) / m;
  };
};

const fetchAPI = function(date) {
  let result = [];
  let random = seededRandom(date.getDate());
  
  // Morning/Afternoon times (12:00 PM to 2:00 PM)
  for(let i = 12; i <= 14; i++) {
    // Check for :00 time slot - make it more restrictive (30% chance)
    if(random() < 0.3) {
      result.push(i + ':00');
    }
    // Check for :30 time slot - make it more restrictive (30% chance)
    if(random() < 0.3) {
      result.push(i + ':30');
    }
  }
  
  // Evening times (8:00 PM to 10:00 PM)
  for(let i = 20; i <= 22; i++) {
    // Check for :00 time slot - make it more restrictive (30% chance)
    if(random() < 0.3) {
      result.push(i + ':00');
    }
    // Check for :30 time slot - make it more restrictive (30% chance)
    if(random() < 0.3) {
      result.push(i + ':30');
    }
  }
  
  // Ensure we have at least 2 times but no more than 6
  if (result.length === 0) {
    // If no times were selected, add at least 2 default times
    result.push('12:00', '20:00');
  } else if (result.length > 6) {
    // Limit to 6 times maximum
    result = result.slice(0, 6);
  }
  
  return result;
};

const submitAPI = function(formData) {
  // Simulate API submission with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({ success: true, message: 'Reservation submitted successfully!' });
      } else {
        resolve({ success: false, message: 'Sorry, this time slot is no longer available. Please try another time.' });
      }
    }, 1000);
  });
};

export { fetchAPI, submitAPI };
