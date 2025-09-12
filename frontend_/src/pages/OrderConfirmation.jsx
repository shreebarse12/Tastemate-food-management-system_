import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [cancelled, setCancelled] = useState(false);
  const order = JSON.parse(localStorage.getItem('order'));
  const now = Date.now();
  const canCancel = order && order.time && (now - order.time < 2 * 60 * 60 * 1000); // 2 hours

  const handleCancel = () => {
    // In real app, call backend for refund
    setCancelled(true);
    localStorage.removeItem('order');
    localStorage.removeItem('selectedMeals');
  };

  if (!order) return <div className="container" style={{padding: '2rem'}}><h2>No order found</h2></div>;

  return (
    <div className="homepage">
      <section className="explore-section">
        <h3 className="section-title">Order Confirmation</h3>
        {cancelled ? (
          <div style={{margin: '2rem 0'}}>
            <h4>Your order has been cancelled and refunded.</h4>
            <button className="btn btn-secondary" onClick={() => navigate('/explore')}>Book Another Meal</button>
          </div>
        ) : (
          <div style={{margin: '2rem 0'}}>
            <h4>Booking Details</h4>
            <ul style={{margin: '1rem 0'}}>
              {Object.entries(order).filter(([k]) => k !== 'messId' && k !== 'paid' && k !== 'time').map(([meal, item]) => (
                <li key={meal}><b>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</b> {item}</li>
              ))}
            </ul>
            <p><b>Status:</b> Paid</p>
            {canCancel && (
              <button className="btn btn-outline" onClick={handleCancel} style={{marginTop: '1rem'}}>Cancel & Refund</button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderConfirmation;
