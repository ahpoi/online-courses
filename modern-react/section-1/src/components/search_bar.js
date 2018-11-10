import * as React from 'react';

/**
 * Functional component
 * Just a function, takes some info return JSX
 *
 * const SearchBar = () => {
  return <input/> //It turns into a call like: React.createElement();
  };
 */

/**
 * Handling events
 * Two steps:
 * First we declare Event handler is a function that should be run when the event occurred
 * We pass the event handler to the element we want to monitor
 */

/**
 * State:
 *
 * Plain js object that is used to record in react to user events
 * Each class based component has its own state obj
 * When the state changes, the component re renders, and its children as well
 *
 * We need to initialise the obj before using it
 * this.state = { term: '' };
 * To manipulate state, you need to use this.setState() for react to knows the state has changed
 */

/**
 * Controlled element (field/form)
 *
 * Form element like an input, the value is set by the state instead of the other way around
 *  <input value={this.state.term}> -> This is now a controlled component where the value is set by the state.
 * So its value only changes when the state changes
 * Before we had input saying, you need to update, i don't need to update
 * With controlled, its the other way around:
 *
 * The input changes: but we still tell the state, hey here is my new value onChange={this.onInputChange}
 * value={this.state.term} causes the component to re-render and when it re-render the value of the input is set to the new value of this.state.term
 */

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { term: '' }
  }

  /*
    All HTML input element emits a change event
   */
  render() {
    return <div className={'search-bar'}>
      <input value={this.state.term}
             onChange={this.onInputChange}/>
    </div>
  }

  /**
   * Have an argument: event
   * All browser element emits have an event object
   * Describe the info about the event that occurred
   */
  onInputChange = (event) => {
    const term = event.target.value;
    this.setState({ term: term });
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;