import React, {useState, useEffect, useContext} from 'react';
import {QuestionListContext} from './QuestionList.jsx';
import styled from 'styled-components';

const Searchbar = styled.input`
width: 300px;`


const SearchQuestions = () => {
  const [query, setQuery] = useState('');
  const [setQuestionsToRender, questionsObject, toRender] = useContext(QuestionListContext)

  const fullQuestionsList = questionsObject;

  useEffect(() => {
    if (query.length >= 3) {
      var results = questionsObject.filter((question) => {
        return question[1].question_body.toLowerCase().includes(query.toLowerCase());
      })
      setQuestionsToRender(results.slice(0, results.length));
    } else {
      setQuestionsToRender(fullQuestionsList.slice(0, toRender));
    }
  }, [query])

  return (
      <div>
        <Searchbar name="search" type="text" value={query} placeholder="Have a question? Search for answers…" onChange={(e) => {
          setQuery(e.target.value);
          }}
        />
      </div>
  )

}

export default SearchQuestions;