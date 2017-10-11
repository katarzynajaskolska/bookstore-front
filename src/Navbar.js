import React from 'react';
import LogoutButton from './LogoutButton';
import auth from './auth';

const Navbar = () =>
  <nav className='navbar nav-palette-5'>
    <div className='container'>
      <div className='navbar-header'>
        <a className='navbar-brand nav-brand'>Bookstore</a>
      </div>
      <div className='navbar-right'>
        <div className='nav-user'>{auth.userEmail}<LogoutButton /></div>
      </div>
    </div>
  </nav>

export default Navbar;
