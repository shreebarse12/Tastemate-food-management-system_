import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import './MessFilter.css';

const MessFilter = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: [],
    rating: 0,
    price: '',
    sortBy: 'recommended'
  });

  const cuisineOptions = [
    'North Indian', 
    'South Indian', 
    'Chinese', 
    'Continental', 
    'Punjabi', 
    'Gujarati'
  ];

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Budget (< ₹70)' },
    { value: 'medium', label: 'Medium (₹70 - ₹120)' },
    { value: 'premium', label: 'Premium (> ₹120)' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'distance', label: 'Distance' }
  ];

  const handleSearchChange = (e) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCuisineChange = (cuisine) => {
    let newCuisines;
    if (filters.cuisine.includes(cuisine)) {
      newCuisines = filters.cuisine.filter(item => item !== cuisine);
    } else {
      newCuisines = [...filters.cuisine, cuisine];
    }

    const newFilters = { ...filters, cuisine: newCuisines };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (e) => {
    const newFilters = { ...filters, rating: Number(e.target.value) };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const newFilters = { ...filters, price: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e) => {
    const newFilters = { ...filters, sortBy: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mess-filter">
      {/* Search bar */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search for mess, cuisine, location..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter toggle button */}
      <button 
        className="filter-toggle"
        onClick={toggleFilters}
      >
        <Filter size={16} className="filter-icon" />
        Filters
        <ChevronDown 
          size={16} 
          className={`chevron-icon ${isFilterOpen ? 'rotated' : ''}`} 
        />
      </button>

      {/* Expandable filters section */}
      {isFilterOpen && (
        <div className="filters-section">
          {/* Cuisine filters */}
          <div className="filter-group">
            <h4>Cuisine Type</h4>
            <div className="cuisine-filters">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineChange(cuisine)}
                  className={`cuisine-button ${
                    filters.cuisine.includes(cuisine) ? 'active' : ''
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div className="filter-group">
            <h4>Rating</h4>
            <div className="rating-filter">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={handleRatingChange}
                className="rating-slider"
              />
              <span className="rating-value">
                {filters.rating > 0 ? `${filters.rating}+` : 'Any'}
              </span>
            </div>
          </div>

          {/* Price filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <select
              value={filters.price}
              onChange={handlePriceChange}
              className="select-filter"
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort options */}
          <div className="filter-group">
            <h4>Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="select-filter"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessFilter;