import React, { Component } from 'react';
import StarRatingComponent from './stars';
import Navbar from './Navbar';
import api from './api';
import SearchBooks from './SearchBooks'

class Protected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };

    this.onStarClick = this.onStarClick.bind(this)
  }

  fetchBooks() {
    api.getNewestBooks().then((result) => {
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
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h2>Newest books</h2>
              { results.map(item =>
                <div className='panel panel-default' key={item.id}>
                  <div className='panel-heading'>
                    <h3 className='panel-title'>{item.title}</h3>
                  </div>
                  <div className='panel-body' style={{backgroundImage: `url("${item.image_url}")`}}></div>
                  <div className='panel-footer'>
                    <p><strong>Author: </strong><span>{item.author}</span></p>
                    <p><strong>Published at: </strong><span>{item.published_at}</span></p>
                    <div className='stars'>
                      <StarRatingComponent
                        name={String(item.id)}
                        starCount={5}
                        value={item.user_rate}
                        onStarClick={this.onStarClick}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='col-md-6'>
              <h2>Search for books</h2>
              <SearchBooks />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Protected;
