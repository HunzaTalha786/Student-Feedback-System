import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLogout, MdLogin, MdDashboard, MdHome } from "react-icons/md";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAdminPath = location.pathname.includes("/admin");
  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/admin/login";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/admin/login";
  };

  const shouldShowMenuButton =
    (isLoggedIn && isAdminPath && location.pathname === "/admin/dashboard") ||
    isHomePage ||
    isLoginPage;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center relative">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Feedback System
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-4 items-center">
        {/* Home shown on login page only */}
        {isLoginPage && (
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium"
          >
            <MdHome className="text-lg" />
            Home
          </Link>
        )}

        {/* Dashboard link for logged-in admin */}
        {isLoggedIn && isAdminPath && (
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium"
          >
            <MdDashboard className="text-lg" />
            Dashboard
          </Link>
        )}

        {/* Admin Login shown on home */}
        {isHomePage && (
          <Link
            to="/admin/login"
            className="flex items-center gap-1 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
          >
            <MdLogin className="text-lg" />
            Admin Login
          </Link>
        )}

        {/* Logout for admin only on dashboard */}
        {isLoggedIn && isAdminPath && location.pathname === "/admin/dashboard" && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            <MdLogout className="text-lg" />
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      {shouldShowMenuButton && (
        <button
          className="sm:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      )}

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full right-6 mt-2 bg-white shadow-lg rounded w-44 p-3 space-y-2 z-50 animate-slide-in">
          {isLoginPage && (
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <MdHome className="text-lg" />
              Home
            </Link>
          )}

          {isLoggedIn && isAdminPath && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <MdDashboard className="text-lg" />
              Dashboard
            </Link>
          )}

          {isHomePage && (
            <Link
              to="/admin/login"
              className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <MdLogin className="text-lg" />
              Admin Login
            </Link>
          )}

          {isLoggedIn && isAdminPath && location.pathname === "/admin/dashboard" && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 transition w-full"
            >
              <MdLogout className="text-lg" />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
