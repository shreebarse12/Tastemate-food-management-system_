import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Calendar, ChevronLeft, Heart, Share2 } from 'lucide-react';
import MenuOptions from './MenuOptions';

const MessDetails = () => {
  const { id } = useParams();
  const [mess, setMess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('menu');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch the mess details from your API
    // This is mock data for demonstration
    const fetchMessDetails = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockMess = {
          id,
          name: 'Annapurna Mess',
          images: [
            '/images/food1.jpg',
            '/images/food2.jpg',
            '/images/food3.jpg',
          ],
          rating: 4.8,
          reviews: 245,
          specialties: ['North Indian', 'South Indian', 'Gujarati'],
          description: 'Annapurna Mess offers authentic home-style food with fresh ingredients and balanced nutrition. Our chefs prepare meals with care, ensuring high quality and taste.',
          location: {
            address: '123 College Road, University Campus',
            distance: '1.2 km away',
            coordinates: { lat: 23.0225, lng: 72.5714 }
          },
          contact: {
            phone: '+91 98765 43210',
            email: 'contact@annapurnamess.com'
          },
          timings: {
            breakfast: '7:30 AM - 9:30 AM',
            lunch: '12:00 PM - 2:30 PM',
            dinner: '7:00 PM - 10:00 PM'
          },
          menu: {
            breakfast: [
              { name: 'Poha', price: '₹40', isVeg: true, image: '/images/food1.jpg' },
              { name: 'Idli Sambhar', price: '₹50', isVeg: true, image: '/images/food2.jpg' },
              { name: 'Paratha with Curd', price: '₹60', isVeg: true, image: '/images/food3.jpg' }
            ],
            lunch: [
              { name: 'Thali (Veg)', price: '₹90', isVeg: true, image: '/images/food1.jpg' },
              { name: 'Thali (Non-Veg)', price: '₹120', isVeg: false, image: '/images/food2.jpg' },
              { name: 'Mini Meal', price: '₹70', isVeg: true, image: '/images/food3.jpg' }
            ],
            dinner: [
              { name: 'Thali (Veg)', price: '₹90', isVeg: true, image: '/images/food1.jpg' },
              { name: 'Thali (Non-Veg)', price: '₹120', isVeg: false, image: '/images/food2.jpg' },
              { name: 'Rice and Curry', price: '₹60', isVeg: true, image: '/images/food3.jpg' }
            ]
          },
          monthlySubscription: {
            oneTime: { price: '₹2,500', meals: '1 meal daily' },
            twoTime: { price: '₹4,800', meals: '2 meals daily' },
            threeTime: { price: '₹6,900', meals: '3 meals daily' }
          },
          reviews: [
            {
              id: 1,
              user: 'Rahul S.',
              rating: 5,
              comment: 'The food tastes just like home! Highly recommended for students.',
              date: '2 weeks ago'
            },
            {
              id: 2,
              user: 'Priya M.',
              rating: 4,
              comment: 'Good quality food at affordable prices. The monthly subscription is worth it.',
              date: '1 month ago'
            }
          ]
        };
        
        setMess(mockMess);
        setLoading(false);
      } catch (err) {
        setError('Failed to load mess details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMessDetails();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would call an API to save this preference
  };

  const shareMessInfo = () => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: mess?.name,
        text: `Check out ${mess?.name} on TasteMate!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share this link: ${window.location.href}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
        <Link to="/mess" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to All Mess Options
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Back button */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/mess" className="flex items-center text-gray-700">
            <ChevronLeft size={20} />
            <span className="ml-1">Back</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleFavorite}
              className="flex items-center text-gray-700"
            >
              <Heart 
                size={20} 
                className={isFavorite ? "fill-red-500 text-red-500" : ""} 
              />
            </button>
            <button 
              onClick={shareMessInfo}
              className="flex items-center text-gray-700"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero image gallery */}
      <div className="relative h-64 md:h-80">
        <img 
          src={mess?.images[0]} 
          alt={mess?.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="container mx-auto px-4 py-4 text-white">
            <h1 className="text-2xl font-bold">{mess?.name}</h1>
            <div className="flex items-center mt-1">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="ml-1 font-medium">{mess?.rating}</span>
              <span className="ml-1 text-sm">({mess?.reviews} reviews)</span>
            </div>
            <div className="flex flex-wrap mt-2 gap-1">
              {mess?.specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="bg-white/20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <p className="text-gray-700 mb-4">{mess?.description}</p>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="text-gray-800">{mess?.location.address}</p>
                <p className="text-sm text-gray-500">{mess?.location.distance}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock size={18} className="text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="text-gray-800">Operating Hours</p>
                <p className="text-sm text-gray-500">Breakfast: {mess?.timings.breakfast}</p>
                <p className="text-sm text-gray-500">Lunch: {mess?.timings.lunch}</p>
                <p className="text-sm text-gray-500">Dinner: {mess?.timings.dinner}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone size={18} className="text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="text-gray-800">{mess?.contact.phone}</p>
                <p className="text-sm text-gray-500">{mess?.contact.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-3 text-center font-medium ${activeTab === 'menu' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </button>
            <button 
              className={`flex-1 py-3 text-center font-medium ${activeTab === 'subscription' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('subscription')}
            >
              Subscription
            </button>
            <button 
              className={`flex-1 py-3 text-center font-medium ${activeTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'menu' && (
              <div>
                <MenuOptions 
                  breakfast={mess?.menu.breakfast} 
                  lunch={mess?.menu.lunch} 
                  dinner={mess?.menu.dinner}
                />
              </div>
            )}

            {activeTab === 'subscription' && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Monthly Subscription Plans
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {/* One meal plan */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-medium mb-2">1 Meal Daily</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      {mess?.monthlySubscription.oneTime.price}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <p className="text-gray-600 mb-4">Choose any one meal (Breakfast/Lunch/Dinner) daily</p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                  
                  {/* Two meals plan */}
                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
                    <div className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full inline-block mb-2">
                      POPULAR
                    </div>
                    <h4 className="text-lg font-medium mb-2">2 Meals Daily</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      {mess?.monthlySubscription.twoTime.price}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <p className="text-gray-600 mb-4">Choose any two meals daily</p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                  
                  {/* Three meals plan */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-medium mb-2">3 Meals Daily</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      {mess?.monthlySubscription.threeTime.price}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <p className="text-gray-600 mb-4">All three meals included daily</p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Customer Reviews</h3>
                  <button className="text-blue-500 text-sm font-medium">
                    Write a Review
                  </button>
                </div>
                
                <div className="space-y-4">
                  {mess?.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  View All Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessDetails;