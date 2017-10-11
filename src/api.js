import axios from 'axios';
import auth from './auth';

const api = {
  getBooks() {
    const url = 'http://localhost:3001/api/books';
    return axios.get(url);
  }
};

export default api;
