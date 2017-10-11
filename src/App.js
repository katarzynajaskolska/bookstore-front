import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './Login';
import auth from './auth';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Protected from './Protected';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = this.props;
    auth.userToken = cookies.get('userToken');
    auth.userEmail = cookies.get('userEmail');
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={Login}/>
          <PrivateRoute exact path="/" component={Protected}/>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default withCookies(App);
