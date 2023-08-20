import React, {useState, useEffect, createContext} from 'react';
import QuestionEntry from './QuestionEntry.jsx'
import exampleData from './exampleData.js';
import styled from 'styled-components';
import axios from 'axios';
import QuestionModal from './QuestionModal.jsx';
import SearchQuestions from './SearchQuestions.jsx';

const MaxHeight = styled.div`
max-height: 500px;
overflow-y: auto`


export const AddQuestionContext = createContext();
export const QuestionListContext = createContext();


const QuestionList = ({productID}) => {
  //contains an array of question objects  //Object.entries(exampleData.results)
  const [questionsObject, setQuestionsObject] = useState([]);
  //determines how many questions to render
  const [toRender, setToRender] = useState(2);
  //contains the questions that will be rendered
  const [questionsToRender, setQuestionsToRender] = useState([]);

  const [isModalShown, setIsModalShown] = useState(false);


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
        <button onClick={handleSubmit}>see more questions</button>
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


  const toggleModal = () => {
    if (!isModalShown) {
      console.log('modal now shown');
      setIsModalShown(true);
    } else {
      console.log('modal no longer being shown');
      setIsModalShown(false);
    }
  }

  //need to create a useContext for the setIsModalShown
  const displayModal = () => {
    if (isModalShown) {
      console.log('question modal should appear')
      return (
        <QuestionModal product_id={productID} setIsModalShown={setIsModalShown}/>
      )
    }
  }
  //create context for this that is passed from index
  const closeModal = () => {
    if (isModalShown) {
      console.log('modal being closed');
      setIsModalShown(false)
    }
  }


  return (
    <div >
      {questionsObject && <QuestionListContext.Provider value={[setQuestionsToRender, questionsObject]}>
        <SearchQuestions/>
        <MaxHeight onClick={closeModal}>
        {questionsToRender && questionsToRender.map((question) => (
          <QuestionEntry id={productID} qObject={question[1]} key={question[0]}/>
          ))
        }
        </MaxHeight>
        <button onClick={toggleModal}>Ask a question</button>
        {displayModal()}
        {renderMoreQuestions()}
      </QuestionListContext.Provider>}

    </div>
  )

}


export default QuestionList;