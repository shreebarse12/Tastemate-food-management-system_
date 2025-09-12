import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaStar, FaUserFriends, FaRegSmile } from 'react-icons/fa';
import logo from '../assets/logoTM.png';
import './HomePage.css';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import food3 from '../assets/food3.jpg';
import home_img from '../assets/home_img.jpg';
const featuredFood = [
  {
    id: 1,
    name: 'Amritsari Special Thali',
    desc: 'A wholesome North Indian meal with dal, sabzi, roti, rice, salad, and dessert.',
    image: food1,
    rating: 4.7,
    price: '₹120',
  },
  {
    id: 2,
    name: 'Veggie Bowl Delight',
    desc: 'A healthy bowl with fresh veggies, paneer, and aromatic spices.',
    image: food2,
    rating: 4.5,
    price: '₹100',
  },
  {
    id: 3,
    name: 'Loaded Pizza',
    desc: 'Cheesy pizza loaded with veggies and a crispy base.',
    image: food3,
    rating: 4.8,
    price: '₹150',
  },
];

const heroImage = home_img;

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'TasteMate made my PG life so much easier! I found the best mess with healthy food and timely service.',
    course: 'B.Tech, 2nd Year',
  },
  {
    name: 'Rahul Verma',
    text: 'The explore feature is amazing. I could compare menus and prices before choosing. Highly recommended!',
    course: 'MBA, 1st Year',
  },
  {
    name: 'Ananya Patel',
    text: 'I love the easy payment and order confirmation. The reviews helped me pick the right mess for my needs.',
    course: 'M.Sc, 3rd Year',
  },
];

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <motion.section className="hero-section" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="hero-content">
          <img src={logo} alt="TM Smart Food Logo" style={{ height: '70px', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 16px #d72660cc)' }} />
          <h2 className="hero-title">Elevate Your Dining Experience</h2>
          <p className="hero-desc">Discover student-preferred messes, personalized meal options, and seamless ordering. TasteMate connects you to the best food experiences around your campus.</p>
          <Link to="/explore" className="btn btn-primary" style={{ boxShadow: '0 4px 24px #d7266040', fontSize: '1.1rem' }}>
            <FaUtensils style={{ marginRight: 8, verticalAlign: 'middle' }} /> Explore Food Options
          </Link>
        </div>
        <motion.div className="hero-images" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
          <span className="hero-heart-anim" aria-label="love">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 54s-18-11.7-18-26A10 10 0 0130 18a10 10 0 0118 10c0 14.3-18 26-18 26z" fill="#ff5a7a" stroke="#fff" strokeWidth="3"/>
            </svg>
          </span>
          <img src={heroImage} alt="Delicious Food" className="hero-food-img" />
        </motion.div>
      </motion.section>

      {/* Explore Food Options */}
      <motion.section className="explore-section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <h3 className="section-title">Explore Food Options</h3>
        <div className="food-cards">
          {featuredFood.map((food) => (
            <motion.div className="food-card" key={food.id} whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #d7266020' }}>
              <img src={food.image} alt={food.name} className="food-img" />
              <div className="food-info">
                <h4>{food.name}</h4>
                <p>{food.desc}</p>
                <div className="food-meta">
                  <span className="rating"><FaStar style={{ color: '#FFD700', marginRight: 4 }} /> {food.rating}</span>
                  <span className="price">{food.price}</span>
                </div>
                <Link to="/explore" className="btn btn-secondary btn-sm">View More</Link>
              </div>
            </motion.div>
          ))}
        </div>
        <Link to="/explore" className="btn btn-outline" style={{ marginTop: 16 }}>Explore More...</Link>
      </motion.section>

      {/* How It Works */}
      <motion.section className="how-it-works-section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
        <h3 className="section-title">How <span className="highlight">TasteMate</span> Works</h3>
        <div className="steps-grid">
          <motion.div className="step" whileHover={{ scale: 1.05, background: '#ffe6ea' }}>
            <div className="step-icon"><FaUtensils /></div>
            <h4>Find Food Options</h4>
            <p>Browse messes and menus near your campus.</p>
          </motion.div>
          <motion.div className="step" whileHover={{ scale: 1.05, background: '#ffe6ea' }}>
            <div className="step-icon"><FaUserFriends /></div>
            <h4>Choose Options</h4>
            <p>Compare prices, cuisines, and reviews.</p>
          </motion.div>
          <motion.div className="step" whileHover={{ scale: 1.05, background: '#ffe6ea' }}>
            <div className="step-icon"><FaRegSmile /></div>
            <h4>Easy Payment</h4>
            <p>Pay securely and confirm your order.</p>
          </motion.div>
          <motion.div className="step" whileHover={{ scale: 1.05, background: '#ffe6ea' }}>
            <div className="step-icon"><FaStar /></div>
            <h4>Enjoy & Rate</h4>
            <p>Enjoy your meal and share your feedback.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section className="testimonials-section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
        <h3 className="section-title">What PG Students Say</h3>
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <motion.div className="testimonial-card" key={idx} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px #d7266020' }}>
              <p className="testimonial-text">“{t.text}”</p>
              <div className="testimonial-author">
                <span className="author-name">{t.name}</span>
                <span className="author-course">{t.course}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
