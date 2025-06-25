import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="text-center mt-32 px-4">
        <img
          className="mx-auto w-60 mb-6"
          src="https://i.ibb.co/vxs5CC02/download.png"
          alt="404"
        />
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
        <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
          Go to Homepage
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;