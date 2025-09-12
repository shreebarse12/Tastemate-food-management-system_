import { useState } from 'react';
import { Star, ThumbsUp, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MessCard.css';

const MessCard = ({ mess }) => {
  // Default mess object with fallback values if props are missing
  const {
    id = '1',
    name = 'Mess Name',
    image = '', 
    rating = 4.2,
    reviews = 120,
    specialties = ['North Indian', 'South Indian'],
    openingHours = '8:00 AM - 10:00 PM',
    location = '1.2 km away',
    price = '₹80 per meal',
    recommended = true,
    likes = 45
  } = mess || {};

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the like button
    setIsLiked(!isLiked);
    // Additional logic to update like count in database would go here
  };

  return (
    <Link to={`/mess/${id}`} className="mess-card">
      <div>
        {/* Image container with recommended badge */}
        <div className="mess-card-image-container">
          <img 
            src={image} 
            alt={name} 
            className="mess-card-image"
          />
          {recommended && (
            <div className="recommended-badge">
              Recommended
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="mess-card-content">
          {/* Header: Name and Rating */}
          <div className="mess-card-header">
            <h3 className="mess-card-name">{name}</h3>
            <div className="mess-card-rating">
              <Star size={16} className="star-icon" />
              <span className="rating-value">{rating}</span>
              <span className="reviews-count">({reviews})</span>
            </div>
          </div>
          
          {/* Specialties */}
          <div className="mess-card-specialties">
            <div className="specialties-container">
              {specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="specialty-tag"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          {/* Details */}
          <div className="mess-card-details">
            <div className="detail-item">
              <Clock size={14} className="detail-icon" />
              <span>{openingHours}</span>
            </div>
            <div className="detail-item">
              <MapPin size={14} className="detail-icon" />
              <span>{location}</span>
            </div>
            <div className="mess-card-price">{price}</div>
          </div>
          
          {/* Like button */}
          <div className="mess-card-actions">
            <button 
              onClick={handleLike} 
              className={`like-button ${isLiked ? 'liked' : ''}`}
            >
              <ThumbsUp size={14} className={`like-icon ${isLiked ? 'filled' : ''}`} />
              <span>{isLiked ? likes + 1 : likes}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MessCard;