// src/routes/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Blogs from '../pages/Blogs';
import Bookings from '../pages/Bookings';
import DoctorDetails from '../pages/DoctorDetails';
import ErrorPage from '../pages/ErrorPage';
import Loader from '../components/Loader'; // Your custom loader animation

const fakeLoader = () => new Promise((resolve) => setTimeout(resolve, 500)); // Simulates loading

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: fakeLoader,
        hydrateFallbackElement: <p className="text-center mt-10 text-blue-500 font-semibold">Loading, Please Wait...</p>,
      },
      {
        path: 'blogs',
        element: <Blogs />,
        loader: fakeLoader,
        hydrateFallbackElement: <p className="text-center mt-10 text-blue-500 font-semibold">Loading, Please Wait...</p>,
      },
      {
        path: 'bookings',
        element: <Bookings />,
        loader: fakeLoader,
        hydrateFallbackElement: <p className="text-center mt-10 text-blue-500 font-semibold">Loading, Please Wait...</p>,
      },
      {
        path: 'doctors/:id',
        element: <DoctorDetails />,
        loader: fakeLoader,
        hydrateFallbackElement: <p className="text-center mt-10 text-blue-500 font-semibold">Loading, Please Wait...</p>,
      },
    ],
  },
]);

export default router;
