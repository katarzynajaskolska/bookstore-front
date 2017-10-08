import React from 'react';
import App from './App';
import { CookiesProvider } from 'react-cookie';

const Root = () =>
  <CookiesProvider>
    <App />
  </CookiesProvider>

export default Root;
