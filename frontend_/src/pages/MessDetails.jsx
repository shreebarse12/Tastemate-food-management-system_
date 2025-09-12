import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HomePage.css';

const messData = {
  1: {
    name: 'Culinary Haven',
    location: '123 College Street',
    rating: 4.7,
    type: 'Veg',
    menu: {
      breakfast: ['Aloo Paratha', 'Poha', 'Tea'],
      lunch: ['Dal Makhani', 'Rice', 'Paneer Butter Masala'],
      dinner: ['Rajma Chawal', 'Roti', 'Salad'],
    },
  },
  2: {
    name: 'Flavour Junction',
    location: '456 University Road',
    rating: 4.5,
    type: 'Non-Veg',
    menu: {
      breakfast: ['Egg Bhurji', 'Bread', 'Coffee'],
      lunch: ['Chicken Curry', 'Rice', 'Salad'],
      dinner: ['Fish Fry', 'Roti', 'Dal'],
    },
  },
  3: {
    name: 'Spice Garden',
    location: '789 Campus Avenue',
    rating: 4.8,
    type: 'Veg',
    menu: {
      breakfast: ['Idli', 'Sambar', 'Chutney'],
      lunch: ['Veg Biryani', 'Raita', 'Papad'],
      dinner: ['Paneer Tikka', 'Naan', 'Dal Fry'],
    },
  },
};

const MessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mess = messData[id];
  const [selectedMeals, setSelectedMeals] = useState({});

  if (!mess) return <div className="container"><h2>Mess not found</h2></div>;

  const handleSelect = (mealType, item) => {
    setSelectedMeals((prev) => ({ ...prev, [mealType]: item }));
  };

  const handleProceed = () => {
    // Save selection to localStorage or context, then navigate
    localStorage.setItem('selectedMeals', JSON.stringify({ messId: id, ...selectedMeals }));
    navigate('/checkout');
  };

  return (
    <div className="homepage">
      <section className="explore-section">
        <h3 className="section-title">{mess.name}</h3>
        <p>{mess.location} | <span className="rating">⭐ {mess.rating}</span> | {mess.type}</p>
        <div style={{margin: '2rem 0'}}>
          {['breakfast', 'lunch', 'dinner'].map((meal) => (
            <div key={meal} style={{marginBottom: '1.5rem'}}>
              <h4 style={{color: '#d72660', marginBottom: '0.5rem'}}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h4>
              <div style={{display: 'flex', gap: '1rem'}}>
                {mess.menu[meal].map((item) => (
                  <button
                    key={item}
                    className={`btn btn-secondary btn-sm${selectedMeals[meal] === item ? ' btn-primary' : ''}`}
                    onClick={() => handleSelect(meal, item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleProceed} disabled={Object.keys(selectedMeals).length === 0}>
          Proceed to Checkout
        </button>
      </section>
    </div>
  );
};

export default MessDetails;