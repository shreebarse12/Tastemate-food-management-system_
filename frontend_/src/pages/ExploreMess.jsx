import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './HomePage.css';

const messes = [
  {
    id: 1,
    name: 'Culinary Haven',
    location: '123 College Street',
    rating: 4.7,
    type: 'Veg',
    image: '/assets/food1.jpg',
  },
  {
    id: 2,
    name: 'Flavour Junction',
    location: '456 University Road',
    rating: 4.5,
    type: 'Non-Veg',
    image: '/assets/food2.jpg',
  },
  {
    id: 3,
    name: 'Spice Garden',
    location: '789 Campus Avenue',
    rating: 4.8,
    type: 'Veg',
    image: '/assets/food3.jpg',
  },
];

const ExploreMess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <div className="homepage">
      <section className="explore-section">
        <h3 className="section-title">Explore Messes</h3>
        <div className="food-cards">
          {messes.map((mess) => (
            <div className="food-card" key={mess.id}>
              <img src={mess.image} alt={mess.name} className="food-img" />
              <div className="food-info">
                <h4>{mess.name}</h4>
                <p>{mess.location}</p>
                <div className="food-meta">
                  <span className="rating">⭐ {mess.rating}</span>
                  <span className="price">{mess.type}</span>
                </div>
                <Link to={`/mess/${mess.id}`} className="btn btn-secondary btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreMess; 