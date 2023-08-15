import React, {useState, useEffect} from 'react';
import QuestionEntry from './QuestionEntry.jsx'
import exampleData from './exampleData.js'



const QuestionList = () => {
  //contains an array of question objects
  const [questionsObject, setQuestionsObject] = useState(Object.entries(exampleData.results));
  //determines how many questions to render
  const [toRender, setToRender] = useState(2);
  //contains the questions that will be rendered
  const [questionsToRender, setQuestionsToRender] = useState([]);

  //initially renders the questions and re-renders upon button click for more questions
  useEffect(() => {
    setQuestionsToRender(questionsObject.slice(0, toRender));
  }, [toRender])

  //will display more buttons when clicked on. Will disappear if no more questions available
  const moreQuestions = (e) => {

    if (toRender < questionsObject.length) {
      return (
        <input type="submit" value="see more questions"/>
      )
    } else {
      return <div></div>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setToRender(toRender + 2);
  }
  return (
    <div>
      {questionsToRender.map((question) => (
        <QuestionEntry qaObject={question[1]} key={question[0]}/>
      ))}
    <form onSubmit={handleSubmit}>
        {moreQuestions()}
    </form>

    </div>
  )

}


export default QuestionList;