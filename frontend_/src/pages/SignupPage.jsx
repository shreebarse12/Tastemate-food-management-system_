/* =============================================================================
// FILE: SignupPage.jsx
//
// ACTION: This file is heavily updated to use the single, unified registration API.
// - It now sends all data to a single '/api/register/' endpoint.
// - It includes a 'user_type' field in the request body.
// - It shows/hides form fields based on the selected role.
// - Added fields for 'enrollment_number' and 'college' for students.
// ============================================================================= */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import './HomePage.css'; // Assuming you have this CSS file

const SignupPage = () => {
  const navigate = useNavigate();
  // Changed role state to match backend choices
  const [role, setRole] = useState("STUDENT"); 
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    mess_name: '', 
    location: '',
    enrollment_number: '',
    college: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Construct the request body for the unified endpoint
    const body = {
      username: form.username,
      email: form.email,
      password: form.password,
      user_type: role, // Send the selected role
    };

    if (role === 'STUDENT') {
      body.enrollment_number = form.enrollment_number;
      body.college = form.college;
    } else { // MESS_OWNER
      body.mess_name = form.mess_name;
      body.location = form.location;
    }

    try {
      // Use the single, unified registration URL
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle complex validation errors from DRF
        let errorMessage = 'Signup failed. Please check your information.';
        const errors = Object.values(data).flat();
        if (errors.length > 0) {
            errorMessage = errors.join(' ');
        }
        throw new Error(errorMessage);
      }
      
      setLoading(false);
      alert('Registration successful! Please log in.'); // A custom modal is better
      navigate('/login');

    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      <section className="explore-section" style={{ maxWidth: 500, margin: '2rem auto' }}>
        <h3 className="section-title">Create an Account</h3>

        {/* Role Switcher */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <button
            className={`btn ${role === "STUDENT" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setRole("STUDENT")}
            type="button"
            style={{ marginRight: "1rem" }}
          >
            I am a Student
          </button>
          <button
            className={`btn ${role === "MESS_OWNER" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setRole("MESS_OWNER")}
            type="button"
          >
            I am a Mess Owner
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Common fields */}
          <div style={{ marginBottom: '1rem' }}>
            <label>Username</label>
            <input type="text" name="username" className="form-control" required value={form.username} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} style={{ width: '100%' }} />
          </div>

          {/* Fields for Student Registration */}
          {role === "STUDENT" && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label>Enrollment Number</label>
                <input type="text" name="enrollment_number" className="form-control" required value={form.enrollment_number} onChange={handleChange} style={{ width: '100%' }}/>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>College Name</label>
                <input type="text" name="college" className="form-control" required value={form.college} onChange={handleChange} style={{ width: '100%' }}/>
              </div>
            </>
          )}

          {/* Fields for Mess Owner Registration */}
          {role === "MESS_OWNER" && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label>Mess Name</label>
                <input type="text" name="mess_name" className="form-control" required value={form.mess_name} onChange={handleChange} style={{ width: '100%' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Location</label>
                <input type="text" name="location" className="form-control" required value={form.location} onChange={handleChange} style={{ width: '100%' }} />
              </div>
            </>
          )}

          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          <span>Already have an account? <Link to="/login">Sign In</Link></span>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
