// Create a new component. This component should produce some HTML
// Take this component's generated HTML and put it on the page (in the DOM)
import * as ReactDOM from 'react-dom';
import * as React from 'react';

/**
 * What gets generated in Vanilla JS:
 * var App = function App() {
   return React.createElement(
    "div",
    null,
    "hi"
  );
};
 */
const App = () => <div>hai</div>;

ReactDOM.render(<App/>, document.querySelector('.container'));