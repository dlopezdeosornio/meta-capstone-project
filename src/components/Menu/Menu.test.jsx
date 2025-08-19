import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from './Menu';

describe('Menu Component', () => {
  test('renders menu header with title and subtitle', () => {
    render(<Menu />);
    
    expect(screen.getByText('Mediterranean Menu')).toBeInTheDocument();
    expect(screen.getByText('Authentic flavors from the Mediterranean coast')).toBeInTheDocument();
  });

  test('renders appetizers section with correct items', () => {
    render(<Menu />);
    
    expect(screen.getByText('Appetizers')).toBeInTheDocument();
    expect(screen.getByText('Hummus with Pita')).toBeInTheDocument();
    expect(screen.getByText('Baba Ganoush')).toBeInTheDocument();
    expect(screen.getByText('Dolmas')).toBeInTheDocument();
    expect(screen.getByText('Falafel')).toBeInTheDocument();
  });

  test('renders main courses section with correct items', () => {
    render(<Menu />);
    
    expect(screen.getByText('Main Courses')).toBeInTheDocument();
    expect(screen.getByText('Grilled Sea Bass')).toBeInTheDocument();
    expect(screen.getByText('Lamb Kebab')).toBeInTheDocument();
    expect(screen.getByText('Chicken Shawarma')).toBeInTheDocument();
    expect(screen.getByText('Vegetarian Moussaka')).toBeInTheDocument();
    expect(screen.getByText('Paella Mediterranea')).toBeInTheDocument();
  });

  test('renders desserts section with correct items', () => {
    render(<Menu />);
    
    expect(screen.getByText('Desserts')).toBeInTheDocument();
    expect(screen.getByText('Baklava')).toBeInTheDocument();
    expect(screen.getByText('Kunafa')).toBeInTheDocument();
    expect(screen.getByText('Greek Yogurt with Honey')).toBeInTheDocument();
    expect(screen.getByText('Turkish Delight')).toBeInTheDocument();
  });

  test('displays correct prices for menu items', () => {
    render(<Menu />);
    
    // Check for specific price values that appear only once
    expect(screen.getByText('$28.00')).toBeInTheDocument(); // Grilled Sea Bass
    expect(screen.getByText('$24.50')).toBeInTheDocument(); // Lamb Kebab
    expect(screen.getByText('$7.00')).toBeInTheDocument(); // Greek Yogurt with Honey
    expect(screen.getByText('$6.50')).toBeInTheDocument(); // Turkish Delight
    
    // Check for prices that appear multiple times
    const price850Elements = screen.getAllByText('$8.50');
    expect(price850Elements).toHaveLength(2); // Hummus and Baklava
    
    const price900Elements = screen.getAllByText('$9.00');
    expect(price900Elements).toHaveLength(2); // Baba Ganoush and Kunafa
  });

  test('displays correct descriptions for menu items', () => {
    render(<Menu />);
    
    expect(screen.getByText(/Creamy chickpea dip with tahini/)).toBeInTheDocument();
    expect(screen.getByText(/Fresh Mediterranean sea bass with herbs/)).toBeInTheDocument();
    expect(screen.getByText(/Layered phyllo pastry with honey/)).toBeInTheDocument();
  });

  test('renders menu footer with additional information', () => {
    render(<Menu />);
    
    expect(screen.getByText(/All dishes prepared with fresh, locally sourced ingredients/)).toBeInTheDocument();
    expect(screen.getByText('Prices subject to change')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<Menu />)).not.toThrow();
  });

  test('has correct CSS classes for styling', () => {
    render(<Menu />);
    
    const menuContainer = screen.getByText('Mediterranean Menu').closest('.menu-container');
    expect(menuContainer).toBeInTheDocument();
    
    const menuHeader = screen.getByText('Mediterranean Menu').closest('.menu-header');
    expect(menuHeader).toBeInTheDocument();
    
    const menuFooter = screen.getByText('Prices subject to change').closest('.menu-footer');
    expect(menuFooter).toBeInTheDocument();
  });

  test('main title is properly structured as h1', () => {
    render(<Menu />);
    
    const mainTitle = screen.getByRole('heading', { level: 1 });
    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle).toHaveTextContent('Mediterranean Menu');
  });

  test('section titles are properly structured as h2', () => {
    render(<Menu />);
    
    const sectionTitles = screen.getAllByRole('heading', { level: 2 });
    expect(sectionTitles).toHaveLength(3);
    expect(sectionTitles[0]).toHaveTextContent('Appetizers');
    expect(sectionTitles[1]).toHaveTextContent('Main Courses');
    expect(sectionTitles[2]).toHaveTextContent('Desserts');
  });

  test('item names are properly structured as h3', () => {
    render(<Menu />);
    
    const itemNames = screen.getAllByRole('heading', { level: 3 });
    expect(itemNames.length).toBeGreaterThan(0);
    
    // Check that some expected item names are present
    expect(itemNames.some(name => name.textContent === 'Hummus with Pita')).toBe(true);
    expect(itemNames.some(name => name.textContent === 'Grilled Sea Bass')).toBe(true);
  });

  test('menu items have correct structure with header and description', () => {
    render(<Menu />);
    
    const menuItems = document.querySelectorAll('.menu-item');
    expect(menuItems.length).toBeGreaterThan(0);
    
    menuItems.forEach(item => {
      const itemHeader = item.querySelector('.item-header');
      const itemDescription = item.querySelector('.item-description');
      
      expect(itemHeader).toBeInTheDocument();
      expect(itemDescription).toBeInTheDocument();
    });
  });

  test('item headers contain name and price', () => {
    render(<Menu />);
    
    const itemHeaders = document.querySelectorAll('.item-header');
    expect(itemHeaders.length).toBeGreaterThan(0);
    
    itemHeaders.forEach(header => {
      const itemName = header.querySelector('.item-name');
      const itemPrice = header.querySelector('.item-price');
      
      expect(itemName).toBeInTheDocument();
      expect(itemPrice).toBeInTheDocument();
    });
  });

  test('renders correct number of menu sections', () => {
    render(<Menu />);
    
    const menuSections = document.querySelectorAll('.menu-section');
    expect(menuSections).toHaveLength(3);
  });

  test('each menu section has correct structure', () => {
    render(<Menu />);
    
    const menuSections = document.querySelectorAll('.menu-section');
    
    menuSections.forEach(section => {
      const sectionTitle = section.querySelector('.section-title');
      const menuItems = section.querySelector('.menu-items');
      
      expect(sectionTitle).toBeInTheDocument();
      expect(menuItems).toBeInTheDocument();
    });
  });
});
