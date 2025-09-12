import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
// import './index.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
    
  );
}

export default App;