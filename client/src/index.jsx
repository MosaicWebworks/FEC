import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QuestionList from './components/qa/QuestionList.jsx'

const App = () => {

  return (
    <div>
      <h1>Hello World</h1>
      <QuestionList/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
