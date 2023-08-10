import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Overview } from './components/Overview/Overview.jsx';
import QuestionList from './components/qa/QuestionList.jsx'

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
