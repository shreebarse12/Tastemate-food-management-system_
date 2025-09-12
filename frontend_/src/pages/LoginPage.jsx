import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import './HomePage.css'; // Assuming you have this CSS file
// import { motion } from 'framer-motion'; // Assuming you use framer-motion

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // The endpoint is now /api/login/ (assuming your main urls.py is set to /api/)
      const res = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The new backend uses 'email' for login
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        // The new backend sends a 'detail' key for errors
        throw new Error(data.detail || 'Invalid credentials.');
      }

      // Store the 'access' token and the full 'user' object
      localStorage.setItem('token', data.access);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      setLoading(false);

      // Redirect based on user type
      if (data.user.user_type === 'MESS_OWNER') {
        navigate('/MessDashboard');
      } else {
        navigate('/explore');
      }

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      <section className="explore-section" style={{maxWidth: 400, margin: '2rem auto'}}>
        <h3 className="section-title">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1rem'}}>
            <label>Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} style={{width: '100%'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <label>Password</label>
            <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} style={{width: '100%'}} />
          </div>
          {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <div style={{marginTop: '1rem'}}>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </div>
      </section>
      {/* Your motion.div and image would go here */}
    </div>
  );
};

export default LoginPage;

