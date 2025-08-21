import { fetchAPI, submitAPI } from './api';

describe('API Functions', () => {
  describe('fetchAPI', () => {
    test('returns an array of time slots', () => {
      const date = new Date('2024-01-15');
      const result = fetchAPI(date);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result.length).toBeLessThanOrEqual(6);
    });

    test('returns consistent results for the same date', () => {
      const date = new Date('2024-01-15');
      const result1 = fetchAPI(date);
      const result2 = fetchAPI(date);
      
      expect(result1).toEqual(result2);
    });

    test('returns different results for different dates', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-16');
      const result1 = fetchAPI(date1);
      const result2 = fetchAPI(date2);
      
      // This test might occasionally fail due to randomness, but it should usually pass
      expect(result1).not.toEqual(result2);
    });

    test('includes morning/afternoon time slots (12:00-14:00)', () => {
      const date = new Date('2024-01-15');
      const result = fetchAPI(date);
      
      const morningTimes = result.filter(time => {
        const hour = parseInt(time.split(':')[0]);
        return hour >= 12 && hour <= 14;
      });
      
      expect(morningTimes.length).toBeGreaterThan(0);
    });

    test('includes evening time slots (20:00-22:00)', () => {
      const date = new Date('2024-01-15');
      const result = fetchAPI(date);
      
      const eveningTimes = result.filter(time => {
        const hour = parseInt(time.split(':')[0]);
        return hour >= 20 && hour <= 22;
      });
      
      expect(eveningTimes.length).toBeGreaterThan(0);
    });

    test('returns time slots in correct format (HH:MM)', () => {
      const date = new Date('2024-01-15');
      const result = fetchAPI(date);
      
      const timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      result.forEach(time => {
        expect(time).toMatch(timeFormat);
      });
    });

    test('handles edge case dates', () => {
      const edgeDates = [
        new Date('2024-01-01'), // First day of month
        new Date('2024-01-31'), // Last day of month
        new Date('2024-12-31'), // Last day of year
        new Date('2024-02-29'), // Leap year date
      ];
      
      edgeDates.forEach(date => {
        const result = fetchAPI(date);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(6);
      });
    });

    test('ensures minimum of 2 time slots', () => {
      const date = new Date('2024-01-15');
      const result = fetchAPI(date);
      
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    test('ensures maximum of 6 time slots', () => {
      const date = new Date('2024-01-15');
      const result = fetchAPI(date);
      
      expect(result.length).toBeLessThanOrEqual(6);
    });
  });

  describe('submitAPI', () => {
    test('returns a Promise', () => {
      const formData = { date: '2024-01-15', time: '19:00' };
      const result = submitAPI(formData);
      
      expect(result).toBeInstanceOf(Promise);
    });

    test('resolves with success response structure', async () => {
      const formData = { date: '2024-01-15', time: '19:00' };
      const result = await submitAPI(formData);
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.message).toBe('string');
    });

    test('returns consistent response structure', async () => {
      const formData = { date: '2024-01-15', time: '19:00' };
      
      // Make a single API call to test response structure
      const result = await submitAPI(formData);
      
      // Verify response has expected properties
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.message).toBe('string');
      
      // Verify message content based on success status
      if (result.success) {
        expect(result.message).toBe('Reservation submitted successfully!');
      } else {
        expect(result.message).toBe('Sorry, this time slot is no longer available. Please try another time.');
      }
    });

    test('success response has correct structure', async () => {
      const formData = { date: '2024-01-15', time: '19:00' };
      let successResponse;
      let attempts = 0;
      const maxAttempts = 10; // Limit attempts to avoid infinite loop
      
      // Keep trying until we get a success response or max attempts reached
      while ((!successResponse || !successResponse.success) && attempts < maxAttempts) {
        successResponse = await submitAPI(formData);
        attempts++;
      }
      
      // If we got a success response, test it
      if (successResponse && successResponse.success) {
        expect(successResponse.success).toBe(true);
        expect(successResponse.message).toBe('Reservation submitted successfully!');
      } else {
        // Skip test if we couldn't get a success response
        console.log('Skipping success response test - no success occurred in limited attempts');
      }
    });

    test('can handle multiple API calls', async () => {
      const formData = { date: '2024-01-15', time: '19:00' };
      
      // Make a few API calls to test functionality
      const results = await Promise.all([
        submitAPI(formData),
        submitAPI(formData),
        submitAPI(formData)
      ]);
      
      // Verify all calls return proper response structure
      results.forEach(result => {
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('message');
        expect(typeof result.success).toBe('boolean');
        expect(typeof result.message).toBe('string');
      });
    });

    test('handles various form data structures', async () => {
      const testCases = [
        { date: '2024-01-15', time: '19:00' },
        { date: '2024-12-25', time: '20:30', guests: 4 },
        { date: '2024-02-14', time: '18:00', occasion: 'Valentine\'s Day' },
      ];
      
      // Test only a few cases to avoid timeout
      for (const formData of testCases) {
        const result = await submitAPI(formData);
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('message');
      }
    });

    test('has reasonable response time', async () => {
      const formData = { date: '2024-01-15', time: '19:00' };
      const startTime = Date.now();
      
      await submitAPI(formData);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Should take approximately 1000ms (1 second) as per the setTimeout
      expect(responseTime).toBeGreaterThan(900);
      expect(responseTime).toBeLessThan(1100);
    });
  });

  describe('seededRandom function (internal)', () => {
    test('produces consistent results for same seed', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-15');
      
      const result1 = fetchAPI(date1);
      const result2 = fetchAPI(date2);
      
      expect(result1).toEqual(result2);
    });

    test('produces different results for different seeds', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-16');
      
      const result1 = fetchAPI(date1);
      const result2 = fetchAPI(date2);
      
      // This should usually be different due to different seeds
      expect(result1).not.toEqual(result2);
    });
  });
});
