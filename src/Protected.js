import React, { Component } from 'react';
import StarRatingComponent from './stars';
import Navbar from './Navbar';
import api from './api';

class Protected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };

    this.onStarClick = this.onStarClick.bind(this)
  }

  fetchBooks() {
    api.getBooks().then((result) => {
      this.setState({
        results: result.data,
      })
    });
  }

  onStarClick(nextValue, prevValue, name) {
    if (prevValue === null) {
      api.postRates(name, nextValue)
    }
    else if (prevValue !== nextValue) {
      api.putRates(name, nextValue)
    }
    if (prevValue === nextValue) {
      api.deleteRates(name)
    }
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
              <span className={item.user_rate}>
                <StarRatingComponent
                  name={String(item.id)}
                  starCount={5}
                  value={item.user_rate}
                  onStarClick={this.onStarClick}
                />
              </span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Protected;
