import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MessExplore from './pages/MessExplore';
import MessDetails from './pages/MessDetails';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import UserProfile from './pages/UserProfile';
import App from './App';
import MessOwnerDashboard from './pages/MessOwnerDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/explore',
        element: <MessExplore />
      },
      {
        path: '/mess/:id',
        element: <MessDetails />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/payment',
        element: <Payment />
      },
      {
        path: '/order-confirmation',
        element: <OrderConfirmation />
      },
      {
        path: '/profile',
        element: <UserProfile />
      },

      // {
      //   path: '/messdashboard',
      //   element: <MessOwnerDashboard />
      // }
    ]

  },
    // Add a new route for the mess dashboard outside the App component's children
  {
    path: '/MessDashboard',
    element: <MessOwnerDashboard />
  }
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;