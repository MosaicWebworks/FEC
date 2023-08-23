import React, {useState, useEffect, useContext, createContext} from 'react';
import QuestionEntry from './QuestionEntry.jsx'
import exampleData from './exampleData.js';
import styled from 'styled-components';
import axios from 'axios';
import QuestionModal from './QuestionModal.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import {ProductContext} from '../../contexts.js';

const MaxHeight = styled.div`
max-height: 50vh;
overflow-y: auto;`



export const QuestionListContext = createContext();
export const ReportContext = createContext();


const QuestionList = () => {

  const [questionsObject, setQuestionsObject] = useState(Object.entries(exampleData.results));

  const [toRender, setToRender] = useState(2);

  const [questionsToRender, setQuestionsToRender] = useState([]);

  const [isModalShown, setIsModalShown] = useState(false);
  const product = useContext(ProductContext)

  let productID =  product.id || 40346;


  useEffect(() => {
    axios.get(`data/qa/questions?product_id=${productID}&count=50`)
      .then((results) => {

        setQuestionsObject(Object.entries(results.data.results))
        setQuestionsToRender(Object.entries(results.data.results).slice(0, toRender));
      })
      .catch((err) => {
        console.log(err)});

    }, [productID])


  useEffect(() => {
    setQuestionsToRender(questionsObject.slice(0, toRender));
  }, [toRender])


//toRender < questionsObject.length
  const renderMoreQuestions = () => {
    if (toRender < questionsObject.length) {
      return (
        <button onClick={handleSubmit}>More answered questions</button>
      )
    } else {
      return <div></div>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setToRender(toRender + 2);

  }


  const toggleModal = () => {
    if (!isModalShown) {
      setIsModalShown(true);
    } else {
      setIsModalShown(false);
    }
  }

  //need to create a useContext for the setIsModalShown
  const displayModal = () => {
    if (isModalShown) {
      return (
        <QuestionModal product_id={productID} setIsModalShown={setIsModalShown}/>
      )
    }
  }
  //create context for this that is passed from index
  const closeModal = () => {
    if (isModalShown) {
      setIsModalShown(false)
    }
  }


  return (
    <div >
      {questionsObject && <QuestionListContext.Provider value={[setQuestionsToRender, questionsObject, toRender]}>
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