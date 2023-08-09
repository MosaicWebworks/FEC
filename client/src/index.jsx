import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {

  return (
    <div>
      <Tester />
      <h1>Hello World</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));