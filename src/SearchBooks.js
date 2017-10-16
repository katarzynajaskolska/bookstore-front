import React, { Component } from 'react';
import './App.css';
import api from './api';
import StarRatingComponent from './stars';

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: '',
    };

    this.setSearchBooks = this.setSearchBooks.bind(this);
    this.fetchSearchBooks = this.fetchSearchBooks.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchBooks(result) {
    this.setState({ result });
  }

  fetchSearchBooks(searchTerm) {
    api.getBooks(searchTerm)
        .then(result => this.setSearchBooks(result.data))
        .catch(e => e);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    this.fetchSearchBooks(searchTerm);

    event.preventDefault();
  }

  componentDidMount() {
    this.fetchSearchBooks('');
  }

  render() {
    const { searchTerm, result } = this.state;
    const list = result || [];
    return (
      <div>
        <div>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
          Search
          </Search>
        </div>
        <Table
          list={list}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <div className='input-group'>
      <input
        type='text'
        className='form-control'
        value={value}
        onChange={onChange}
      />
      <span className='input-group-btn'>
        <button type="submit" className='btn btn-palette-1'>
          {children}
        </button>
      </span>
    </div>
  </form>

class Table extends Component {
  constructor(props) {
    super(props);

    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    const newName = name.split('-')[1];
    if (prevValue === null) {
      api.postRates(newName, nextValue)
    }
    else if (prevValue !== nextValue) {
      api.putRates(newName, nextValue)
    }
    if (prevValue === nextValue) {
      api.deleteRates(newName)
    }
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          { this.props.list.map(item =>
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                <StarRatingComponent
                  name={`booklist-${String(item.id)}`}
                  starCount={5}
                  value={item.user_rate}
                  onStarClick={this.onStarClick}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default SearchBooks;
