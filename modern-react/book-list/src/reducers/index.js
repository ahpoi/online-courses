import { combineReducers } from 'redux';
import { booksReducer } from './reducer_books';

/**
 * Telling redux how to create out application state
 */
const rootReducer = combineReducers({
  books: booksReducer
});

export default rootReducer;
