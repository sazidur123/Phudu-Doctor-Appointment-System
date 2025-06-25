import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-16 text-center text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        <NavLink
          to="/"
          className="flex items-center justify-center gap-2 text-xl font-bold text-blue-800"
        >
          <img
            src="https://i.ibb.co.com/XkCSX5xR/logo.png"
            alt="logo"
            className="w-8 h-8 object-contain"
          />
          Phudu
        </NavLink>

        <div className="flex flex-wrap justify-center gap-4 text-base">
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

        <div className="flex justify-center space-x-4 text-lg">
          <a
            href="https://youtube/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <img className="h-9 w-9 rounded-full" src="https://i.ibb.co.com/cX1Bz0F1/You-Tube-icon-2013-2017.png" alt="" />
          </a>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <img className="h-9 w-9 rounded-full" src="https://i.ibb.co.com/yB8mm0jk/Linked-In-logo-initials.png" alt="" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <img className="h-9 w-9 rounded-full" src="https://i.ibb.co.com/vCfkd6XB/Facebook-Logo-2019.png" alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
