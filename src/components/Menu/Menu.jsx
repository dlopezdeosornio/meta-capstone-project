import React from 'react';
import './menu.css';

const Menu = () => {
  const appetizers = [
    {
      name: "Hummus with Pita",
      price: "$8.50",
      description: "Creamy chickpea dip with tahini, olive oil, and warm pita bread"
    },
    {
      name: "Baba Ganoush",
      price: "$9.00",
      description: "Smoky roasted eggplant dip with garlic, lemon, and herbs"
    },
    {
      name: "Dolmas",
      price: "$10.50",
      description: "Grape leaves stuffed with rice, herbs, and pine nuts"
    },
    {
      name: "Falafel",
      price: "$8.00",
      description: "Crispy chickpea fritters with tahini sauce and pickled vegetables"
    }
  ];

  const mainCourses = [
    {
      name: "Grilled Sea Bass",
      price: "$28.00",
      description: "Fresh Mediterranean sea bass with herbs, lemon, and olive oil"
    },
    {
      name: "Lamb Kebab",
      price: "$24.50",
      description: "Marinated lamb with grilled vegetables and tzatziki sauce"
    },
    {
      name: "Chicken Shawarma",
      price: "$22.00",
      description: "Spiced chicken with garlic sauce, pickles, and fries"
    },
    {
      name: "Vegetarian Moussaka",
      price: "$20.00",
      description: "Layers of eggplant, potatoes, and béchamel sauce"
    },
    {
      name: "Paella Mediterranea",
      price: "$26.00",
      description: "Saffron rice with seafood, chicken, and Mediterranean vegetables"
    }
  ];

  const desserts = [
    {
      name: "Baklava",
      price: "$8.50",
      description: "Layered phyllo pastry with honey, nuts, and spices"
    },
    {
      name: "Kunafa",
      price: "$9.00",
      description: "Sweet cheese pastry soaked in rose water syrup"
    },
    {
      name: "Greek Yogurt with Honey",
      price: "$7.00",
      description: "Creamy yogurt drizzled with local honey and walnuts"
    },
    {
      name: "Turkish Delight",
      price: "$6.50",
      description: "Rose and pistachio flavored confectionery"
    }
  ];

  const renderMenuSection = (title, items) => (
    <section className="menu-section" aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}>
      <h2 className="section-title" id={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}>{title}</h2>
      <div className="menu-items" role="list" aria-label={`${title} menu items`}>
        {items.map((item, index) => (
          <article key={index} className="menu-item" role="listitem">
            <div className="item-header">
              <h3 className="item-name">{item.name}</h3>
              <span className="item-price" aria-label={`Price: ${item.price}`}>{item.price}</span>
            </div>
            <p className="item-description">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <main className="menu-container" role="main">
      <header className="menu-header">
        <h1 className="menu-title">Mediterranean Menu</h1>
        <p className="menu-subtitle">Authentic flavors from the Mediterranean coast</p>
      </header>
      
      {renderMenuSection("Appetizers", appetizers)}
      {renderMenuSection("Main Courses", mainCourses)}
      {renderMenuSection("Desserts", desserts)}
      
      <footer className="menu-footer">
        <p>All dishes prepared with fresh, locally sourced ingredients</p>
        <p>Prices subject to change</p>
      </footer>
    </main>
  );
};

export default Menu;
