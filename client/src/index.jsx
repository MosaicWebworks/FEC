import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QuestionList from './components/qa/QuestionList.jsx'
import { Overview } from './components/Overview/Overview.jsx'
const App = () => {

  return (
    <div>
      <h1>Hello World</h1>
      <Overview />
      <QuestionList/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));