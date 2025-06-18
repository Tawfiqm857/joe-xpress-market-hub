
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import CartIcon from "./CartIcon";
import "./Navbar.css";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${theme}-mode`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <h1 className="text-xl md:text-2xl font-bold">
            Joe<span className="accent">Express</span>
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-link text-sm md:text-base">
            Home
          </Link>
          <Link to="/products" className="navbar-link text-sm md:text-base">
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/post-product" className="navbar-link text-sm md:text-base">
                Sell
              </Link>
              <Link to="/dashboard" className="navbar-link text-sm md:text-base">
                Dashboard
              </Link>
              <button className="navbar-button text-sm md:text-base" onClick={handleLogout}>
                Logout
              </button>
              <div className="navbar-user text-sm md:text-base px-3 py-1.5 rounded-full">
                {user?.name}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link text-sm md:text-base">
                Login
              </Link>
              <Link to="/register" className="navbar-signup text-sm md:text-base px-4 py-2">
                Sign Up
              </Link>
            </>
          )}

          <div className="flex items-center gap-4 ml-2">
            <CartIcon />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link text-base py-3" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="mobile-link text-base py-3" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link to="/cart" className="mobile-link text-base py-3" onClick={() => setIsMenuOpen(false)}>
            Cart
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/post-product" className="mobile-link text-base py-3" onClick={() => setIsMenuOpen(false)}>
                Sell
              </Link>
              <Link to="/dashboard" className="mobile-link text-base py-3" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <button className="mobile-button text-base py-3" onClick={handleLogout}>
                Logout
              </button>
              <div className="mobile-user text-base py-2 my-2">
                Welcome, {user?.name}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link text-base py-3" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="mobile-signup text-base py-3 my-2" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          <div className="mobile-theme-toggle py-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
