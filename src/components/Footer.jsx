import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <footer>
    <nav>
      <div className="nav-links-container">
        <ul className="nav-links">
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/experience">Experience</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <a href="/#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
    <p>Copyright © 2025 Rohit Biswas. All Rights Reserved.</p>
  </footer>
);

export default Footer;
