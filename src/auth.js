import axios from 'axios';

const auth = {
  userToken: null,
  isAuthenticated() {
    return !!this.userToken
  },
  authenticate({ email, password, onSuccess, onError }) {
    axios.post('http://localhost:3001/api/login', {
      email,
      password
    })
    .then((response) => {
      this.userToken = response.data.token;
      onSuccess(this.userToken);
    })
    .catch(() => onError() );
  },
  signout(callback) {
    this.userToken = null;
    callback();
  }
}

export default auth;
