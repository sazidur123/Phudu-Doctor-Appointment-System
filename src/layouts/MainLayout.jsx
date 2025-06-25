// src/layouts/MainLayout.jsx
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePageTitle from "../hooks/usePageTitle";

const MainLayout = () => {
  usePageTitle();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />

      {/* Loading shown during any route transition */}
      {isLoading && (
        <div className="fixed top-16 left-0 right-0 bg-blue-100 text-blue-600 text-center py-2 z-50 font-medium shadow-md">
          Loading...
        </div>
      )}

      <div className="pt-20">
        <Outlet />
      </div>

      <Footer />

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};

export default MainLayout;
