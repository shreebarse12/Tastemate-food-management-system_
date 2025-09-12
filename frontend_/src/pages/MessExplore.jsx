import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessCard from '../components/mess/MessCard';
import MessFilter from '../components/mess/MessFilter';
import './MessExplore.css';
import food1Image from '../assets/food1.jpg';
import food2Image from '../assets/food2.jpg';
import food3Image from '../assets/food3.jpg';

// Mock data for mess options
const mockMessData = [
  {
    id: 1,
    name: 'Spice Garden',
    location: '789 Campus Avenue',
    rating: 4.8,
    reviews: 120,
    specialties: ['North Indian', 'South Indian'],
    openingHours: '8:00 AM - 10:00 PM',
    price: '₹80 per meal',
    recommended: true,
    likes: 45,
    image: food1Image,
    tags: ['North Indian', 'South Indian', 'Chinese'],
  },
  {
    id: 2,
    name: 'Culinary Haven',
    location: '123 College Street',
    rating: 4.7,
    reviews: 120,
    specialties: ['North Indian', 'South Indian'],
    openingHours: '8:00 AM - 10:00 PM',
    price: '₹80 per meal',
    recommended: true,
    likes: 45,
    image: food2Image,
    tags: ['North Indian', 'South Indian', 'Chinese'],
  },
  {
    id: 3,
    name: 'Green Plate',
    location: '567 Library Road',
    rating: 4.6,
    reviews: 120,
    specialties: ["North Indian", "South Indian"],
    openingHours: '8:00 AM - 10:00 PM',
    price: '₹80 per meal',
    recommended: true,
    likes: 45,
    image: food3Image,
    tags: ['South Indian', 'Chinese'],
  },
  {
    id: 4,
    name: 'Flavour Junction',
    location: '456 University Road',
    rating: 4.5,
    reviews: 120,
    specialties: ['North Indian', 'South Indian'],
    openingHours: '8:00 AM - 10:00 PM',
    price: '₹80 per meal',
    recommended: true,
    likes: 45,
    image: food1Image,
    tags: ["North Indian", "Continental"],
  },
  {
    id: 5,
    name: 'Campus Delights',
    location: '890 Science Block',
    rating: 4.3,
    reviews: 120,
    specialties: ['North Indian', 'South Indian'],
    openingHours: '8:00 AM - 10:00 PM',
    price: '₹80 per meal',
    recommended: true,
    likes: 45,
    image: food2Image,
    tags: ['Multi Cuisine', 'Fast Food'],
  },
  {
    id: 6,
    name: 'Hostel Bites',
    location: '234 Hostel Lane',
    rating: 4.2,
    reviews: 120,
    specialties: ['North Indian', 'South Indian'],
    openingHours: '8:00 AM - 10:00 PM',
    price: '₹80 per meal',
    recommended: true,
    likes: 45,
    image: food3Image,
    tags: ['North Indian', 'Fast Food'],
  },
];

const MessExplore = () => {
  const [messOptions, setMessOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: [],
    rating: 0,
    price: '',
    sortBy: 'recommended'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setMessOptions(mockMessData);
      setFilteredOptions(mockMessData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, messOptions]);

  const applyFilters = () => {
    let filtered = [...messOptions];

    // Apply search query filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (mess) =>
          mess.name.toLowerCase().includes(query) ||
          mess.location.toLowerCase().includes(query) ||
          mess.specialties.some((specialty) => specialty.toLowerCase().includes(query))
      );
    }

    // Apply cuisine type filter
    if (filters.cuisine.length > 0) {
      filtered = filtered.filter((mess) =>
        mess.specialties.some(specialty => filters.cuisine.includes(specialty))
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((mess) => mess.rating >= filters.rating);
    }

    // Apply price filter
    if (filters.price && filters.price !== 'all') {
      // This is a simplified price filter - you can enhance it based on your needs
      filtered = filtered.filter((mess) => {
        const price = parseInt(mess.price.replace(/[^\d]/g, ''));
        switch (filters.price) {
          case 'budget':
            return price < 70;
          case 'medium':
            return price >= 70 && price <= 120;
          case 'premium':
            return price > 120;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'recommended':
      default:
        // Keep original order for recommended
        break;
    }

    setFilteredOptions(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="mess-explore">
      <div className="container">
        <div className="mess-explore-header">
          <h1>Explore Mess Options</h1>
          <p>Find the best mess options near your campus</p>
        </div>

        <MessFilter onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading mess options...</p>
          </div>
        ) : filteredOptions.length === 0 ? (
          <div className="no-results">
            <h3>No mess options found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="mess-grid">
            {filteredOptions.map((mess) => (
              <Link to={`/mess/${mess.id}`} key={mess.id} className="mess-card-link">
                <MessCard mess={mess} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessExplore;