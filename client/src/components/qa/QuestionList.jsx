import React, {useState, useEffect} from 'react';
import QuestionEntry from './QuestionEntry.jsx'
import exampleData from './exampleData.js';
import styled from 'styled-components';
import axios from 'axios';


const MaxHeight = styled.div`
max-height: 500px;
overflow-y: auto`


const QuestionList = ({productID}) => {
  //contains an array of question objects  //Object.entries(exampleData.results)
  const [questionsObject, setQuestionsObject] = useState([]);
  //determines how many questions to render
  const [toRender, setToRender] = useState(2);
  //contains the questions that will be rendered
  const [questionsToRender, setQuestionsToRender] = useState([]);

  productID = 40347 || productID;
  //makes initial api call and stores fetched info into different states
    //can refactor to use one less state?

  useEffect(() => {
    axios.get(`data/qa/questions?product_id=${productID}&count=30`)
      .then((results) => {
        setQuestionsObject(Object.entries(results.data.results))
        setQuestionsToRender(Object.entries(results.data.results).slice(0, toRender));
      })
      .catch((err) => {
        console.log(err)});

    }, [])


    ////initially renders the questions and re-renders upon button click for more questions
    useEffect(() => {
      setQuestionsToRender(questionsObject.slice(0, toRender));
    }, [toRender])



  //will display more buttons when clicked on. Will disappear if no more questions available
  const renderMoreQuestions = () => {
    if (toRender < questionsObject.length) {
      return (
        <button onClick={handleSubmit}>See more questions</button>
      )
    } else {
      return <div></div>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setToRender(toRender + 2);
    console.log(toRender);
  }
  return (
    <div>
        <MaxHeight>
        {questionsToRender && questionsToRender.map((question) => (
            <QuestionEntry id={productID} qObject={question[1]} key={question[0]}/>
          ))
        }
        </MaxHeight>
          {renderMoreQuestions()}

    </div>
  )

}


export default QuestionList;