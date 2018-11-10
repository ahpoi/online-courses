import React, { Component } from 'react';
import {connect} from 'react-redux';

class BookList extends Component {

  renderList() {
    return this.props.books.map(book => {
      return <li className='list-group-item'> {book.title}</li>
    })
  }

  render() {
    return (
      <div>
        <ul className='list-group col-sm-4'>
          {this.renderList()}
        </ul>
      </div>
    );
  }

}

/**
 * Take application state will convert it to props
 */
function mapStateToProps(state) {
  return {
      books: state.books
  };
}

/**
 * Takes a function and a component that produce a container
 */
export default connect(mapStateToProps)(BookList)