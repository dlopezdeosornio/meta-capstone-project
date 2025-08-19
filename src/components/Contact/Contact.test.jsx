import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactSection from './Contact';

describe('ContactSection Component', () => {
  test('renders contact section with correct title', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('renders follow us section with correct title', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  test('displays correct contact information', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('Email: info@littlelemon.com')).toBeInTheDocument();
  });

  test('displays correct social media platforms', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<ContactSection />)).not.toThrow();
  });

  test('has correct CSS classes for styling', () => {
    render(<ContactSection />);
    
    const contactSection = screen.getByText('Contact Us').closest('.contactSection');
    expect(contactSection).toBeInTheDocument();
    
    const contactContent = screen.getByText('Contact Us').closest('.contact-content');
    expect(contactContent).toBeInTheDocument();
    
    const contactSections = document.querySelectorAll('.contact-section');
    expect(contactSections).toHaveLength(2);
  });

  test('section headings are properly structured as h3', () => {
    render(<ContactSection />);
    
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Contact Us');
    expect(headings[1]).toHaveTextContent('Follow Us');
  });

  test('contact information is properly structured', () => {
    render(<ContactSection />);
    
    const contactSection = screen.getByText('Contact Us').closest('.contact-section');
    expect(contactSection).toContainElement(screen.getByText('123 Main St, Anytown, USA'));
    expect(contactSection).toContainElement(screen.getByText('Email: info@littlelemon.com'));
  });

  test('social media information is properly structured', () => {
    render(<ContactSection />);
    
    const followSection = screen.getByText('Follow Us').closest('.contact-section');
    expect(followSection).toContainElement(screen.getByText('Facebook'));
    expect(followSection).toContainElement(screen.getByText('Instagram'));
    expect(followSection).toContainElement(screen.getByText('Twitter'));
  });

  test('component maintains proper semantic structure', () => {
    render(<ContactSection />);
    
    const mainContainer = screen.getByText('Contact Us').closest('.contactSection');
    const contentContainer = mainContainer.querySelector('.contact-content');
    const sections = contentContainer.querySelectorAll('.contact-section');
    
    expect(mainContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();
    expect(sections).toHaveLength(2);
  });

  test('all text content is visible and readable', () => {
    render(<ContactSection />);
    
    const allText = [
      'Contact Us',
      '123 Main St, Anytown, USA',
      'Email: info@littlelemon.com',
      'Follow Us',
      'Facebook',
      'Instagram',
      'Twitter'
    ];
    
    allText.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test('component has proper accessibility structure', () => {
    render(<ContactSection />);
    
    // Check that headings are properly nested
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    
    // Check that all headings have text content
    headings.forEach(heading => {
      expect(heading.textContent).toBeTruthy();
    });
  });

  test('contact sections are properly separated', () => {
    render(<ContactSection />);
    
    const contactSections = document.querySelectorAll('.contact-section');
    expect(contactSections).toHaveLength(2);
    
    // First section should contain contact information
    const firstSection = contactSections[0];
    expect(firstSection).toContainElement(screen.getByText('Contact Us'));
    expect(firstSection).toContainElement(screen.getByText('123 Main St, Anytown, USA'));
    
    // Second section should contain social media information
    const secondSection = contactSections[1];
    expect(secondSection).toContainElement(screen.getByText('Follow Us'));
    expect(secondSection).toContainElement(screen.getByText('Facebook'));
  });

  test('component renders consistently', () => {
    const { rerender } = render(<ContactSection />);
    
    // Re-render the component
    rerender(<ContactSection />);
    
    // All content should still be present
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });
});
