import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';

// Mock the dish images
jest.mock('../../assets/Dishes/pastaSmall.jpg', () => 'mocked-pasta.jpg');
jest.mock('../../assets/Dishes/bruscheta2Small.jpg', () => 'mocked-bruschetta.jpg');
jest.mock('../../assets/Dishes/fishSmall.jpg', () => 'mocked-fish.jpg');

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Homepage Component', () => {
  test('renders main heading', () => {
    renderWithRouter(<Homepage />);
    
    expect(screen.getByText('Welcome to Little Lemon!')).toBeInTheDocument();
  });

  test('renders new menu section with correct content', () => {
    renderWithRouter(<Homepage />);
    
    expect(screen.getByText('Our New Menu')).toBeInTheDocument();
    expect(screen.getByText(/Our menu has been created by our head chef, John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/We are excited to announce our new menu/)).toBeInTheDocument();
  });

  test('renders weekly specials section with correct content', () => {
    renderWithRouter(<Homepage />);
    
    expect(screen.getByText('Weekly Specials')).toBeInTheDocument();
    expect(screen.getByText(/Our weekly specials are a collection/)).toBeInTheDocument();
  });

  test('renders menu link with correct href', () => {
    renderWithRouter(<Homepage />);
    
    const menuLink = screen.getByText('Find out more!');
    expect(menuLink).toBeInTheDocument();
    expect(menuLink.tagName).toBe('A');
    expect(menuLink).toHaveAttribute('href', '/menu');
  });

  test('renders all weekly special images with correct sources and alt text', () => {
    renderWithRouter(<Homepage />);
    
    const pastaImage = screen.getByAltText('Weekly Special 1');
    const bruschettaImage = screen.getByAltText('Weekly Special 2');
    const fishImage = screen.getByAltText('Weekly Special 3');
    
    expect(pastaImage).toBeInTheDocument();
    expect(bruschettaImage).toBeInTheDocument();
    expect(fishImage).toBeInTheDocument();
    
    expect(pastaImage).toHaveAttribute('src', 'mocked-pasta.jpg');
    expect(bruschettaImage).toHaveAttribute('src', 'mocked-bruschetta.jpg');
    expect(fishImage).toHaveAttribute('src', 'mocked-fish.jpg');
  });

  test('renders without crashing', () => {
    expect(() => renderWithRouter(<Homepage />)).not.toThrow();
  });

  test('has correct CSS classes for styling', () => {
    renderWithRouter(<Homepage />);
    
    const mainElement = screen.getByText('Welcome to Little Lemon!').closest('.main');
    expect(mainElement).toBeInTheDocument();
    
    const newMenuSection = screen.getByText('Our New Menu').closest('.new-menu');
    expect(newMenuSection).toBeInTheDocument();
    
    const weeklySpecialsSection = screen.getByText('Weekly Specials').closest('.weekly-specials');
    expect(weeklySpecialsSection).toBeInTheDocument();
    
    const imageCarousel = screen.getByAltText('Weekly Special 1').closest('.image-carousel');
    expect(imageCarousel).toBeInTheDocument();
  });

  test('main heading is properly structured as h1', () => {
    renderWithRouter(<Homepage />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Welcome to Little Lemon!');
  });

  test('section headings are properly structured as h2', () => {
    renderWithRouter(<Homepage />);
    
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Our New Menu');
    expect(headings[1]).toHaveTextContent('Weekly Specials');
  });

  test('all images have proper alt text for accessibility', () => {
    renderWithRouter(<Homepage />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    
    images.forEach(image => {
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')).not.toBe('');
    });
  });

  test('content is properly structured in articles', () => {
    renderWithRouter(<Homepage />);
    
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
    
    const newMenuArticle = articles[0];
    const weeklySpecialsArticle = articles[1];
    
    expect(newMenuArticle).toContainElement(screen.getByText('Our New Menu'));
    expect(weeklySpecialsArticle).toContainElement(screen.getByText('Weekly Specials'));
  });
});
