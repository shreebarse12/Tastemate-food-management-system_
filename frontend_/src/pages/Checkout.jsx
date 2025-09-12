import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const Checkout = () => {
  const navigate = useNavigate();
  const selected = JSON.parse(localStorage.getItem('selectedMeals'));

  if (!selected) {
    return <div className="container" style={{padding: '2rem'}}><h2>No meals selected</h2></div>;
  }

  const handlePayment = () => {
    // In real app, call backend to create order
    navigate('/payment');
  };

  return (
    <div className="homepage">
      <section className="explore-section">
        <h3 className="section-title">Checkout</h3>
        <div style={{margin: '2rem 0'}}>
          <h4>Selected Meals</h4>
          <ul style={{margin: '1rem 0'}}>
            {Object.entries(selected).filter(([k]) => k !== 'messId').map(([meal, item]) => (
              <li key={meal}><b>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</b> {item}</li>
            ))}
          </ul>
        </div>
        <button className="btn btn-primary" onClick={handlePayment}>Proceed to Payment</button>
      </section>
    </div>
  );
};

export default Checkout;