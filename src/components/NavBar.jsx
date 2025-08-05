// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Desktop nav */}
      <nav id="desktop-nav">
        <div className="logo">Rohit Biswas</div>
        <div>
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
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hamburger / mobile nav */}
      <nav id="hamburger-nav">
        <div className="logo">Rohit Biswas</div>
        <div className="hamburger-menu">
          <div
            className={`hamburger-icon ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`menu-links ${menuOpen ? "open" : ""}`}>
            <li>
              <NavLink
                to="/about"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/experience"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
