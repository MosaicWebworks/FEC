import React, {useState, useEffect, useContext, createContext} from 'react';
import QuestionEntry from './QuestionEntry.jsx'
import exampleData from './exampleData.js';
import styled, {ThemeProvider} from 'styled-components';
import axios from 'axios';
import QuestionModal from './QuestionModal.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import {ProductContext, ModalContext} from '../../contexts.js';
import {StyledButton, Button} from '../Styles/ButtonStyles.jsx';

const MaxHeight = styled.div`
max-height: 50vh;
overflow-y: auto;`




export const QuestionListContext = createContext();
export const ReportContext = createContext();

const QuestionList = () => {

  const [questionsObject, setQuestionsObject] = useState([]);
  const [toRender, setToRender] = useState(2);
  const [questionsToRender, setQuestionsToRender] = useState([]);



  const product = useContext(ProductContext);
  const [isModalShown,setIsModalShown, closeModal] = useContext(ModalContext);

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



  const renderMoreQuestions = () => {
    if (toRender < questionsObject.length) {
      return (
        <Button onClick={handleSubmit}>More answered questions</Button>
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


  const displayModal = () => {
    if (isModalShown) {
      return (
        <QuestionModal product_id={productID} setIsModalShown={setIsModalShown}/>
      )
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
        <Button onClick={toggleModal}>Ask a question</Button>
        {displayModal()}
        {renderMoreQuestions()}
      </QuestionListContext.Provider>}
    </div>
  )

}


export default QuestionList;