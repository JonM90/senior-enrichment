import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/campuses">Campuses</Link>
        </div>
        <div>
          <Link to="/students">Students</Link>
        </div>
        <hr />
      </nav>
    )
}

export default NavBar;
