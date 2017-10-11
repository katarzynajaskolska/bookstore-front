import React, { Component } from 'react';
import Navbar from './Navbar';
import api from './api';

class Protected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  fetchBooks() {
    api.getBooks().then((result) => {
      this.setState({
        results: result.data,
      })
    });
  }

  componentDidMount() {
    this.fetchBooks();
  }

  render() {
    const results = this.state.results || [];

    return (
      <div>
        <Navbar />
        <ul>
          { results.map(item =>
            <li key={item.id}>
              <span>{item.title}</span>
              <span>{item.author}</span>
              <span>{item.published_at}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Protected;
