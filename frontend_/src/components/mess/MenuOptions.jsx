import { useState } from 'react';
import { Star, Clock, Heart, Plus, Minus, Info } from 'lucide-react';

const MenuOptions = ({ menuItems = [], onAddToCart }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [favorites, setFavorites] = useState([]);

  const toggleItemExpand = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const incrementQuantity = (itemId) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const decrementQuantity = (itemId) => {
    if (itemQuantities[itemId] > 0) {
      setItemQuantities(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
    }
  };

  const handleAddToCart = (item) => {
    const quantity = itemQuantities[item.id] || 0;
    if (quantity > 0) {
      onAddToCart({
        ...item,
        quantity
      });
      // Reset quantity after adding to cart
      setItemQuantities(prev => ({
        ...prev,
        [item.id]: 0
      }));
    }
  };

  const getDietaryBadge = (tag) => {
    const badges = {
      'vegetarian': 'bg-green-100 text-green-800',
      'vegan': 'bg-emerald-100 text-emerald-800',
      'gluten-free': 'bg-yellow-100 text-yellow-800',
      'spicy': 'bg-red-100 text-red-800',
      'low-carb': 'bg-blue-100 text-blue-800',
      'high-protein': 'bg-purple-100 text-purple-800'
    };
    
    return badges[tag.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      {menuItems.length > 0 ? (
        menuItems.map(item => (
          <div 
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Food Image */}
              <div className="sm:w-1/4 relative">
                <img 
                  src={item.imageUrl || "/api/placeholder/200/200"} 
                  alt={item.name}
                  className="w-full h-40 sm:h-full object-cover" 
                />
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                >
                  <Heart 
                    size={18} 
                    className={`${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>

              {/* Food Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-500 mr-3">
                          <Star className="fill-yellow-500" size={16} />
                          <span className="text-sm ml-1">{item.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock size={14} className="mr-1" />
                          {item.prepTime} mins
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">₹{item.price}</div>
                  </div>

                  {/* Dietary Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags && item.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`px-2 py-0.5 rounded-full text-xs ${getDietaryBadge(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description (expandable) */}
                  <div className="mt-2">
                    <p className={`text-sm text-gray-600 ${!expandedItems.includes(item.id) && 'line-clamp-2'}`}>
                      {item.description}
                    </p>
                    {item.description && item.description.length > 100 && (
                      <button 
                        className="text-blue-500 text-xs mt-1 flex items-center"
                        onClick={() => toggleItemExpand(item.id)}
                      >
                        {expandedItems.includes(item.id) ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <button 
                      onClick={() => decrementQuantity(item.id)}
                      className="p-1 border border-gray-300 rounded-md"
                      disabled={!itemQuantities[item.id]}
                    >
                      <Minus size={16} className={`${!itemQuantities[item.id] ? 'text-gray-300' : 'text-gray-600'}`} />
                    </button>
                    <span className="mx-3 min-w-8 text-center">{itemQuantities[item.id] || 0}</span>
                    <button 
                      onClick={() => incrementQuantity(item.id)}
                      className="p-1 border border-gray-300 rounded-md"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!itemQuantities[item.id]}
                    className={`px-4 py-2 rounded-md text-sm ${
                      itemQuantities[item.id] 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Info size={48} className="text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No menu items found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default MenuOptions;