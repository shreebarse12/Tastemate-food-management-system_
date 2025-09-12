import React, { useState } from 'react';
import './HomePage.css';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')));
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => {
    setCancelled(true);
    setOrder(null);
    localStorage.removeItem('order');
    localStorage.removeItem('selectedMeals');
  };

  return (
    <div className="homepage">
      <section className="explore-section" style={{maxWidth: 600, margin: '2rem auto'}}>
        <h3 className="section-title">My Profile</h3>
        <div style={{marginBottom: '2rem'}}>
          <h4>User Info</h4>
          <p><b>Name:</b> {user?.name}</p>
          <p><b>Email:</b> {user?.email}</p>
        </div>
        <div>
          <h4>My Bookings</h4>
          {!order && !cancelled && <p>No bookings found.</p>}
          {cancelled && <p style={{color: 'green'}}>Booking cancelled and refunded.</p>}
          {order && !cancelled && (
            <div style={{margin: '1rem 0'}}>
              <ul>
                {Object.entries(order).filter(([k]) => k !== 'messId' && k !== 'paid' && k !== 'time').map(([meal, item]) => (
                  <li key={meal}><b>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</b> {item}</li>
                ))}
              </ul>
              <button className="btn btn-outline" onClick={handleCancel} style={{marginTop: '1rem'}}>Cancel & Refund</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
