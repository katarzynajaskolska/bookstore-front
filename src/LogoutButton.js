import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from './auth';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class LogoutButton extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    auth.signout(() => {
      this.props.history.push('/')
      this.props.cookies.remove('userToken');
    })
  }

  render() {
    return (
      <p>
        Welcome!
        <button onClick={this.onClick}>
          Sign out
        </button>
      </p>
    )
  }
}

const LogoutButtonWithRouter = withRouter(LogoutButton);

export default withCookies(LogoutButtonWithRouter);
