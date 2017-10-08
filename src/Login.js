import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import auth from './auth';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  state = {
    redirectToReferrer: false
  }

  login = () => {
    auth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  submit = (event) => {
    auth.authenticate({
      email: this.email_input.value,
      password: this.password_input.value,
      callback: (userToken) => {
        this.setState({ redirectToReferrer: true });
        this.props.cookies.set('userToken', userToken);
      }
    });
    event.preventDefault();
  }

  render() {
    if (auth.isAuthenticated()) { return <Redirect to='/' /> }

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) { return <Redirect to={from} /> }

    return (
      <div className='form-wrapper'>
        <div className='panel panel-default form-container'>
          <div className='panel-body'>
            <div className='logo'>bookstore</div>
            <form onSubmit={this.submit}>
              <div className='form-group'>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Email'
                  ref={ node => { this.email_input = node; } }
                />
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  type='password'
                  placeholder='Password'
                  ref={ node => { this.password_input = node; } }
                />
              </div>
              <button type='submit' className='btn btn-palette-1 pull-right'>Log in</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withCookies(Login);
