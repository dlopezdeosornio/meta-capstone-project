import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

// Mock the logo image
jest.mock('../../assets/Logos/logo.jpg', () => 'mocked-logo.jpg');

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('renders header with correct content', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Little Lemon')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('renders logo image with correct source', () => {
    renderWithRouter(<Header />);
    
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toHaveAttribute('src', 'mocked-logo.jpg');
    expect(logoImage).toHaveClass('logo');
  });

  test('logo is wrapped in a link to home page', () => {
    renderWithRouter(<Header />);
    
    const logoLink = screen.getByAltText('logo').closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('header has correct CSS class', () => {
    renderWithRouter(<Header />);
    
    const headerElement = screen.getByText('Little Lemon').closest('.header');
    expect(headerElement).toBeInTheDocument();
  });

  test('logo container has correct CSS class', () => {
    renderWithRouter(<Header />);
    
    const logoContainer = screen.getByAltText('logo').closest('.logo-container');
    expect(logoContainer).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => renderWithRouter(<Header />)).not.toThrow();
  });

  test('main heading is properly structured', () => {
    renderWithRouter(<Header />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Little Lemon');
  });

  test('logo is accessible with proper alt text', () => {
    renderWithRouter(<Header />);
    
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'logo');
  });
});
