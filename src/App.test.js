import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock all the components to isolate App component testing
jest.mock('./components/Header/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock('./components/Nav/Nav', () => {
  return function MockNav() {
    return <div data-testid="nav">Navigation Component</div>;
  };
});

jest.mock('./components/Homepage/Homepage', () => {
  return function MockHomepage() {
    return <div data-testid="homepage">Homepage Component</div>;
  };
});

jest.mock('./components/ReservationForm/ReservationForm', () => {
  return function MockReservationForm() {
    return <div data-testid="reservation-form">Reservation Form Component</div>;
  };
});

jest.mock('./components/Menu/Menu', () => {
  return function MockMenu() {
    return <div data-testid="menu">Menu Component</div>;
  };
});

jest.mock('./components/Contact/Contact', () => {
  return function MockContact() {
    return <div data-testid="contact">Contact Component</div>;
  };
});

jest.mock('./components/Footer/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>;
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    expect(() => renderWithRouter(<App />)).not.toThrow();
  });

  test('renders all main components', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders homepage by default on root route', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });

  test('has correct CSS class for main container', () => {
    renderWithRouter(<App />);
    
    const appContainer = screen.getByTestId('header').closest('.App');
    expect(appContainer).toBeInTheDocument();
  });

  test('main components are rendered in correct order', () => {
    renderWithRouter(<App />);
    
    const appContainer = screen.getByTestId('header').closest('.App');
    const children = Array.from(appContainer.children);
    
    // Check that components are rendered in the expected order
    expect(children[0]).toHaveAttribute('data-testid', 'nav');
    expect(children[1]).toHaveAttribute('data-testid', 'header');
    expect(children[2]).toHaveAttribute('data-testid', 'homepage');
    expect(children[3]).toHaveAttribute('data-testid', 'footer');
  });

  test('app structure maintains proper layout', () => {
    renderWithRouter(<App />);
    
    const appContainer = screen.getByTestId('header').closest('.App');
    expect(appContainer).toBeInTheDocument();
    
    // App should contain navigation, header, main content area, and footer
    const nav = appContainer.querySelector('[data-testid="nav"]');
    const header = appContainer.querySelector('[data-testid="header"]');
    const mainContent = appContainer.querySelector('[data-testid="homepage"]');
    const footer = appContainer.querySelector('[data-testid="footer"]');
    
    expect(nav).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  test('component renders consistently across multiple renders', () => {
    const { rerender } = renderWithRouter(<App />);
    
    // Re-render the component
    rerender(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // All components should still be present
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('app maintains proper semantic structure', () => {
    renderWithRouter(<App />);
    
    const appContainer = screen.getByTestId('header').closest('.App');
    
    // App should be a div with the App class
    expect(appContainer.tagName.toLowerCase()).toBe('div');
    expect(appContainer).toHaveClass('App');
  });

  test('all required components are imported and rendered', () => {
    renderWithRouter(<App />);
    
    // Check that all expected components are rendered
    const expectedComponents = [
      'nav',
      'header', 
      'homepage',
      'footer'
    ];
    
    expectedComponents.forEach(componentId => {
      expect(screen.getByTestId(componentId)).toBeInTheDocument();
    });
  });
});
