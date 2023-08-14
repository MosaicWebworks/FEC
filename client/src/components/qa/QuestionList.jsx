import React, {useState} from 'react';
import QuestionEntry from './QuestionEntry.jsx'
import exampleData from './exampleData.js'



const QuestionList = () => {
  //contains an array of question objects
  const [questions, setQuestions] = useState(Object.entries(exampleData.results));

  return (
    <div>
      {questions.map((question) => (
        <QuestionEntry qaObject={question[1]} key={question[0]}/>
      ))}

    </div>
  )

}


export default QuestionList;