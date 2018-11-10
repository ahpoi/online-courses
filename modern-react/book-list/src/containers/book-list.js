import React, { Component } from 'react';

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
