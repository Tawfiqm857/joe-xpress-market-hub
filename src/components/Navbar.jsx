import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

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
    <nav
      className={`${theme}-mode`}
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#121212",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--primary)",
              marginRight: "0.5rem",
            }}
          >
            Joe<span style={{ color: "var(--accent)" }}>Express</span>
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            color: theme === "light" ? "#001f3f" : "#ffffff",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center space-x-6"
          style={{
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: theme === "light" ? "#001f3f" : "#ffffff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{
              color: theme === "light" ? "#001f3f" : "#ffffff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/post-product"
                style={{
                  color: theme === "light" ? "#001f3f" : "#ffffff",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Sell
              </Link>
              <Link
                to="/dashboard"
                style={{
                  color: theme === "light" ? "#001f3f" : "#ffffff",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: theme === "light" ? "#001f3f" : "#ffffff",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Logout
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "var(--accent)",
                  fontWeight: 500,
                }}
              >
                {user?.name}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  color: theme === "light" ? "#001f3f" : "#ffffff",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Sign Up
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden"
          style={{
            padding: "1rem",
            backgroundColor: theme === "light" ? "#f5f5f5" : "#1e1e1e",
            borderTop: `1px solid ${theme === "light" ? "#e0e0e0" : "#333333"}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: theme === "light" ? "#001f3f" : "#ffffff",
                textDecoration: "none",
                fontWeight: 500,
                padding: "0.5rem 0",
              }}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: theme === "light" ? "#001f3f" : "#ffffff",
                textDecoration: "none",
                fontWeight: 500,
                padding: "0.5rem 0",
              }}
            >
              Products
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/post-product"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: theme === "light" ? "#001f3f" : "#ffffff",
                    textDecoration: "none",
                    fontWeight: 500,
                    padding: "0.5rem 0",
                  }}
                >
                  Sell
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: theme === "light" ? "#001f3f" : "#ffffff",
                    textDecoration: "none",
                    fontWeight: 500,
                    padding: "0.5rem 0",
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: theme === "light" ? "#001f3f" : "#ffffff",
                    fontWeight: 500,
                    cursor: "pointer",
                    padding: "0.5rem 0",
                    textAlign: "left",
                  }}
                >
                  Logout
                </button>
                <div
                  style={{
                    padding: "0.5rem 0",
                    color: "var(--accent)",
                    fontWeight: 500,
                  }}
                >
                  {user?.name}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: theme === "light" ? "#001f3f" : "#ffffff",
                    textDecoration: "none",
                    fontWeight: 500,
                    padding: "0.5rem 0",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "2rem",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}

            <div style={{ marginTop: "0.5rem" }}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
