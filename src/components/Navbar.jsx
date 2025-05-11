
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
          <h1>
            Joe<span className="accent">Express</span>
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/products" className="navbar-link">
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/post-product" className="navbar-link">
                Sell
              </Link>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
              <div className="navbar-user">{user?.name}</div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-signup">
                Sign Up
              </Link>
            </>
          )}

          <div className="flex items-center gap-3">
            <CartIcon />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link to="/cart" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
            Cart
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/post-product" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                Sell
              </Link>
              <Link to="/dashboard" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <button className="mobile-button" onClick={handleLogout}>
                Logout
              </button>
              <div className="mobile-user">{user?.name}</div>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="mobile-signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          <div className="mobile-theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
