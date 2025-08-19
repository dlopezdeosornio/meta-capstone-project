import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Nav Component', () => {
  test('renders navigation menu with all required links', () => {
    renderWithRouter(<Nav />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Reserve a table')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('all navigation links have correct href attributes', () => {
    renderWithRouter(<Nav />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const menuLink = screen.getByText('Menu').closest('a');
    const reserveLink = screen.getByText('Reserve a table').closest('a');
    const contactLink = screen.getByText('Contact').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(menuLink).toHaveAttribute('href', '/menu');
    expect(reserveLink).toHaveAttribute('href', '/reserve');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  test('navigation has correct CSS class', () => {
    renderWithRouter(<Nav />);
    
    const navElement = screen.getByText('Home').closest('.nav');
    expect(navElement).toBeInTheDocument();
  });

  test('navigation items are properly structured in a list', () => {
    renderWithRouter(<Nav />);
    
    const navList = screen.getByRole('list');
    expect(navList).toBeInTheDocument();
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  test('renders without crashing', () => {
    expect(() => renderWithRouter(<Nav />)).not.toThrow();
  });

  test('all links are accessible', () => {
    renderWithRouter(<Nav />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
    
    links.forEach(link => {
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });
  });

  test('navigation maintains proper semantic structure', () => {
    renderWithRouter(<Nav />);
    
    const nav = screen.getByText('Home').closest('.nav');
    const ul = nav.querySelector('ul');
    const liElements = ul.querySelectorAll('li');
    
    expect(ul).toBeInTheDocument();
    expect(liElements).toHaveLength(4);
    
    liElements.forEach(li => {
      expect(li.querySelector('a')).toBeInTheDocument();
    });
  });

  test('each navigation item contains exactly one link', () => {
    renderWithRouter(<Nav />);
    
    const listItems = screen.getAllByRole('listitem');
    
    listItems.forEach(item => {
      const links = item.querySelectorAll('a');
      expect(links).toHaveLength(1);
    });
  });
});
