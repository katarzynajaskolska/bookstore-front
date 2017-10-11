import React from 'react';
import LogoutButton from './LogoutButton';
import auth from './auth';

const Navbar = () =>
  <nav class='navbar navbar-default'>
    <div class='container'>
      <div><LogoutButton /><h3>{auth.userEmail}</h3></div>
    </div>
  </nav>

export default Navbar;
