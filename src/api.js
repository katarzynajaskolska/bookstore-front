import axios from 'axios';
import auth from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api'
});

const api = {
  getBooks(searchTerm) {
    const url = `/books?query=${searchTerm}`;
    return axiosInstance({
      method: 'get',
      url: url,
      headers: { 'Authorization': auth.userToken }
    });
  },

  getNewestBooks() {
    const url = '/newest_books';
    return axiosInstance({
      method: 'get',
      url: url,
      headers: { 'Authorization': auth.userToken }
    });
  },

  postRates(bookId, value) {
    const url = '/rates';
    return axiosInstance({
      method: 'post',
      url: url,
      headers: { 'Authorization': auth.userToken },
      data: {
        book_id: bookId,
        value: value
      }
    });
  },

  putRates(bookId, value) {
    const url = '/rates';
    return axiosInstance({
      method: 'put',
      url: url,
      headers: { 'Authorization': auth.userToken },
      data: {
        book_id: bookId,
        value: value
      }
    });
  },

  deleteRates(bookId) {
    const url = '/rates';
    return axiosInstance({
      method: 'delete',
      url: url,
      headers: { 'Authorization': auth.userToken },
      data: {
        book_id: bookId
      }
    });
  },
};

export default api;
