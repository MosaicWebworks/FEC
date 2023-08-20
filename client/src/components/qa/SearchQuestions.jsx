import React, {useState, useContext} from 'react';
import {QuestionListContext} from './QuestionList.jsx';

//needs list of questions objects
//needs set questions to render
const SearchQuestions = () => {
  const [query, setQuery] = useState('');
  const [setQuestionsToRender, questionsObject] = useContext(QuestionListContext)

  const fullQuestionsList = questionsObject;



  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length >= 3) {
      var results = questionsObject.filter((question) => {
        console.log('query being searched:', query);
        return question[1].question_body.toLowerCase().includes(query.toLowerCase());
      })
      setQuestionsToRender(results);
      console.log('filtered questions:', results)
    } else {
      setQuestionsToRender(fullQuestionsList);
    }


  }

  return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="search questions" onChange={(e) => setQuery(e.target.value)}></input>
        {console.log('query:', query)}
      </form>

  )



}

export default SearchQuestions;