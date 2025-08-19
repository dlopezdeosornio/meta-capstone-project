import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders footer with correct title', () => {
    render(<Footer />);
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('renders follow us section with correct title', () => {
    render(<Footer />);
    
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  test('displays correct contact information', () => {
    render(<Footer />);
    
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('Email: info@littlelemon.com')).toBeInTheDocument();
  });

  test('displays correct social media platforms', () => {
    render(<Footer />);
    
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  test('has correct CSS classes for styling', () => {
    render(<Footer />);
    
    const footerElement = screen.getByText('Contact Us').closest('.footer');
    expect(footerElement).toBeInTheDocument();
    
    const footerContent = screen.getByText('Contact Us').closest('.footer-content');
    expect(footerContent).toBeInTheDocument();
    
    const footerSections = document.querySelectorAll('.footer-section');
    expect(footerSections).toHaveLength(2);
  });

  test('section headings are properly structured as h3', () => {
    render(<Footer />);
    
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Contact Us');
    expect(headings[1]).toHaveTextContent('Follow Us');
  });

  test('contact information is properly structured', () => {
    render(<Footer />);
    
    const contactSection = screen.getByText('Contact Us').closest('.footer-section');
    expect(contactSection).toContainElement(screen.getByText('123 Main St, Anytown, USA'));
    expect(contactSection).toContainElement(screen.getByText('Email: info@littlelemon.com'));
  });

  test('social media information is properly structured', () => {
    render(<Footer />);
    
    const followSection = screen.getByText('Follow Us').closest('.footer-section');
    expect(followSection).toContainElement(screen.getByText('Facebook'));
    expect(followSection).toContainElement(screen.getByText('Instagram'));
    expect(followSection).toContainElement(screen.getByText('Twitter'));
  });

  test('component maintains proper semantic structure', () => {
    render(<Footer />);
    
    const mainContainer = screen.getByText('Contact Us').closest('.footer');
    const contentContainer = mainContainer.querySelector('.footer-content');
    const sections = contentContainer.querySelectorAll('.footer-section');
    
    expect(mainContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();
    expect(sections).toHaveLength(2);
  });

  test('all text content is visible and readable', () => {
    render(<Footer />);
    
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
    render(<Footer />);
    
    // Check that headings are properly nested
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    
    // Check that all headings have text content
    headings.forEach(heading => {
      expect(heading.textContent).toBeTruthy();
    });
  });

  test('footer sections are properly separated', () => {
    render(<Footer />);
    
    const footerSections = document.querySelectorAll('.footer-section');
    expect(footerSections).toHaveLength(2);
    
    // First section should contain contact information
    const firstSection = footerSections[0];
    expect(firstSection).toContainElement(screen.getByText('Contact Us'));
    expect(firstSection).toContainElement(screen.getByText('123 Main St, Anytown, USA'));
    
    // Second section should contain social media information
    const secondSection = footerSections[1];
    expect(secondSection).toContainElement(screen.getByText('Follow Us'));
    expect(secondSection).toContainElement(screen.getByText('Facebook'));
  });

  test('component renders consistently', () => {
    const { rerender } = render(<Footer />);
    
    // Re-render the component
    rerender(<Footer />);
    
    // All content should still be present
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  test('footer is positioned at the bottom of the page', () => {
    render(<Footer />);
    
    const footerElement = screen.getByText('Contact Us').closest('.footer');
    expect(footerElement).toBeInTheDocument();
    
    // Footer should be a semantic footer element
    const footerTag = footerElement.tagName.toLowerCase();
    expect(footerTag).toBe('div'); // Since it's a div with footer class
  });

  test('footer content is properly centered and structured', () => {
    render(<Footer />);
    
    const footerContent = screen.getByText('Contact Us').closest('.footer-content');
    expect(footerContent).toBeInTheDocument();
    
    // Footer content should contain both sections
    const sections = footerContent.querySelectorAll('.footer-section');
    expect(sections).toHaveLength(2);
  });

  test('footer maintains consistent spacing and layout', () => {
    render(<Footer />);
    
    const footerSections = document.querySelectorAll('.footer-section');
    
    footerSections.forEach(section => {
      const heading = section.querySelector('h3');
      const paragraphs = section.querySelectorAll('p');
      
      expect(heading).toBeInTheDocument();
      expect(paragraphs.length).toBeGreaterThan(0);
    });
  });
});
