import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const Payment = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      // In real app, call backend for payment
      localStorage.setItem('order', JSON.stringify({ ...JSON.parse(localStorage.getItem('selectedMeals')), paid: true, time: Date.now() }));
      setProcessing(false);
      navigate('/order-confirmation');
    }, 1500);
  };

  return (
    <div className="homepage">
      <section className="explore-section">
        <h3 className="section-title">Payment</h3>
        <form onSubmit={handlePay} style={{maxWidth: 400, margin: '2rem auto'}}>
          <div style={{marginBottom: '1rem'}}>
            <label>Card Number</label>
            <input type="text" className="form-control" required placeholder="1234 5678 9012 3456" style={{width: '100%'}} />
          </div>
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{flex: 1}}>
              <label>Expiry</label>
              <input type="text" className="form-control" required placeholder="MM/YY" style={{width: '100%'}} />
            </div>
            <div style={{flex: 1}}>
              <label>CVV</label>
              <input type="password" className="form-control" required placeholder="123" style={{width: '100%'}} />
            </div>
          </div>
          <button className="btn btn-primary" type="submit" disabled={processing}>{processing ? 'Processing...' : 'Pay Now'}</button>
        </form>
      </section>
    </div>
  );
};

export default Payment;