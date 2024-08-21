import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Importing CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">CourseApp</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
