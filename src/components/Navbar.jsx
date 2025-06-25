import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // or use any icon library you prefer

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#EFEFEF] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-blue-800">
          <img
            src="https://i.ibb.co.com/XkCSX5xR/logo.png"
            alt="logo"
            className="w-8 h-8 object-contain"
          />
          Phudu
        </NavLink>

        {/* Desktop Menu */}
        <div className="space-x-4 hidden md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            My-Bookings
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/errorpage"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Emergency Button - Always visible now */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hidden md:block">
          Emergency
        </button>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-blue-800">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#EFEFEF] px-4 py-4 space-y-2">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 font-semibold" : "block hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/bookings"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 font-semibold" : "block hover:text-blue-500"
            }
          >
            My-Bookings
          </NavLink>
          <NavLink
            to="/blogs"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 font-semibold" : "block hover:text-blue-500"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/errorpage"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 font-semibold" : "block hover:text-blue-500"
            }
          >
            Contact Us
          </NavLink>
          <button className="w-full bg-blue-600 text-white py-2 rounded-full mt-2">
            Emergency
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
