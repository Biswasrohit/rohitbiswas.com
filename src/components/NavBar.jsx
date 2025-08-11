// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((s) => !s);
  const { pathname, hash } = useLocation();

  // Auto-close menu on any route/hash change (mobile quality-of-life)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  return (
    <>
      {/* Desktop nav */}
      <nav id="desktop-nav">
        <Link to="/" className="logo">
          Rohit Biswas
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/experience"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Experience
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Projects
            </NavLink>
          </li>
          {/* If Contact lives on "/", jump to its section id */}
          <li>
            <a href="/#contact" className={hash === "#contact" ? "active" : ""}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile nav */}
      <nav id="hamburger-nav">
        <Link to="/" className="logo">
          Rohit Biswas
        </Link>
        <div className="hamburger-menu">
          <button
            type="button"
            className={`hamburger-icon ${menuOpen ? "open" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul
            id="mobile-menu"
            className={`menu-links ${menuOpen ? "open" : ""}`}
          >
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/experience"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <a
                href="/#contact"
                className={hash === "#contact" ? "active" : ""}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
