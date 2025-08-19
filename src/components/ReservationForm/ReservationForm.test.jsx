import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationForm from './ReservationForm';

// Mock console.log and alert
global.console.log = jest.fn();
global.alert = jest.fn();

describe('ReservationForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with correct title and description', () => {
    render(<ReservationForm />);
    
    expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
    expect(screen.getByText('Book your perfect dining experience with us')).toBeInTheDocument();
  });

  test('renders all form fields with correct labels', () => {
    render(<ReservationForm />);
    
    expect(screen.getByLabelText('Date *')).toBeInTheDocument();
    expect(screen.getByText('Time *')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of People *')).toBeInTheDocument();
  });

  test('renders submit button with correct text', () => {
    render(<ReservationForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Reserve Table' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  test('date input has correct attributes', () => {
    render(<ReservationForm />);
    
    const dateInput = screen.getByLabelText('Date *');
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveClass('form-input');
  });

  test('time radio buttons are initially disabled until date is selected', () => {
    render(<ReservationForm />);
    
    expect(screen.getByText('Please select a date first')).toBeInTheDocument();
  });

  test('occasion select has correct options', () => {
    render(<ReservationForm />);
    
    const occasionSelect = screen.getByLabelText('Occasion (Optional)');
    expect(occasionSelect).toHaveValue('');
    
    // Check for specific occasion options
    expect(screen.getByText('Birthday')).toBeInTheDocument();
    expect(screen.getByText('Anniversary')).toBeInTheDocument();
    expect(screen.getByText('Business Meeting')).toBeInTheDocument();
    expect(screen.getByText('Date Night')).toBeInTheDocument();
    expect(screen.getByText('Family Gathering')).toBeInTheDocument();
    expect(screen.getByText('Celebration')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  test('number of people select has correct options', () => {
    render(<ReservationForm />);
    
    const peopleSelect = screen.getByLabelText('Number of People *');
    expect(peopleSelect).toHaveAttribute('required');
    
    // Check for options 1-10
    for (let i = 1; i <= 10; i++) {
      const optionText = i === 1 ? '1 person' : `${i} people`;
      expect(screen.getByText(optionText)).toBeInTheDocument();
    }
  });

  test('form validation shows errors for required fields', () => {
    render(<ReservationForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Reserve Table' });
    userEvent.click(submitButton);
    
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByText('Time is required')).toBeInTheDocument();
    expect(screen.getByText('Number of people is required')).toBeInTheDocument();
  });

  test('form has correct CSS classes for styling', () => {
    render(<ReservationForm />);
    
    const container = screen.getByText('Reserve a Table').closest('.reserve-table-container');
    expect(container).toBeInTheDocument();
    
    const content = screen.getByText('Reserve a Table').closest('.reserve-table-content');
    expect(content).toBeInTheDocument();
    
    const form = document.querySelector('.reservation-form');
    expect(form).toHaveClass('reservation-form');
  });

  test('form groups have correct structure', () => {
    render(<ReservationForm />);
    
    const formGroups = document.querySelectorAll('.form-group');
    expect(formGroups.length).toBeGreaterThan(0);
    
    formGroups.forEach(group => {
      const label = group.querySelector('label');
      const input = group.querySelector('input, select');
      
      expect(label).toBeInTheDocument();
      if (input) {
        expect(input).toBeInTheDocument();
      }
    });
  });

  test('error messages have correct styling', () => {
    render(<ReservationForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Reserve Table' });
    userEvent.click(submitButton);
    
    const errorMessages = screen.getAllByText(/is required/);
    errorMessages.forEach(message => {
      expect(message).toHaveClass('error-message');
    });
  });

  test('inputs with errors have error class', () => {
    render(<ReservationForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Reserve Table' });
    userEvent.click(submitButton);
    
    const dateInput = screen.getByLabelText('Date *');
    const peopleSelect = screen.getByLabelText('Number of People *');
    
    expect(dateInput).toHaveClass('error');
    expect(peopleSelect).toHaveClass('error');
  });

  test('form maintains proper accessibility', () => {
    render(<ReservationForm />);
    
    // Check that all form controls have proper labels
    const dateInput = screen.getByLabelText('Date *');
    const peopleSelect = screen.getByLabelText('Number of People *');
    
    expect(dateInput).toHaveAttribute('id', 'date');
    expect(peopleSelect).toHaveAttribute('id', 'numberOfPeople');
    
    // Check that labels are properly associated
    const dateLabel = screen.getByText('Date *');
    const peopleLabel = screen.getByText('Number of People *');
    
    expect(dateLabel).toHaveAttribute('for', 'date');
    expect(peopleLabel).toHaveAttribute('for', 'numberOfPeople');
  });

  test('form structure is correct', () => {
    render(<ReservationForm />);
    
    // Check that all required form elements are present
    expect(screen.getByLabelText('Date *')).toBeInTheDocument();
    expect(screen.getByText('Time *')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of People *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reserve Table' })).toBeInTheDocument();
  });

  test('form validation structure is correct', () => {
    render(<ReservationForm />);
    
    // Submit empty form to trigger validation
    const submitButton = screen.getByRole('button', { name: 'Reserve Table' });
    userEvent.click(submitButton);
    
    // Check that validation errors are displayed
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByText('Time is required')).toBeInTheDocument();
    expect(screen.getByText('Number of people is required')).toBeInTheDocument();
    
    // Check that error messages have proper styling
    const errorMessages = screen.getAllByText(/is required/);
    errorMessages.forEach(message => {
      expect(message).toHaveClass('error-message');
    });
  });
});
