import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="flex">
      <nav className="flex flex-grow1 align-self-center justify-center">
        <div className="flex flex1 align-self-center margin-zero-auto" style={{marginLeft: 'calc(20% - 1rem)' }}>
          <h2><Link to="/">Home</Link></h2>
        </div>
        <div className="flex flex1 align-self-center margin-zero-auto">
        <h2><Link to="/campuses">Campuses</Link></h2>
        </div>
        <div className="flex flex1 align-self-center margin-zero-auto">
        <h2><Link to="/students">Students</Link></h2>
        </div>
        <div className="flex flex1 align-self-center margin-zero-auto">
          <h2><Link to="/assign">Assign</Link></h2>
        </div>
        <hr />
      </nav>
    </header>
  )
}

export default NavBar;
