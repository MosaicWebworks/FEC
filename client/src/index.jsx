import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import styled from 'styled-components';
import {ThemeProvider} from 'styled-components';
import RatingsReviews from './components/rr/RatingsReviews.jsx';
import QuestionList from './components/qa/QuestionList.jsx';
import Overview from './components/Overview/Overview.jsx'
import {ProductContext, ModalContext, AnswerModalContext} from './contexts.js'
import {sampleProduct} from './components/Overview/sampleData.js';
import {Container, Section, theme, SecondaryText, darkTheme, OuterContainer, Heading1, Heading2} from './components/Styles/LayoutStyles.jsx';
import {Button} from './components/Styles/OverviewStyles.jsx';



const App = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isAnswerModalShown, setIsAnswerModalShown] = useState(false);
  const [product, setProduct] = React.useState(sampleProduct);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeToUse, setThemeToUse] = useState(theme);
  const closeModal = () => {
    if (isModalShown || isAnswerModalShown) {
      setIsModalShown(false);
      setIsAnswerModalShown(false);
    }
  }

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      setThemeToUse(theme);
    } else {
      setIsDarkMode(true);
      setThemeToUse(darkTheme);
    }
  }
  document.body.style = `background: ${themeToUse.colors.background};`;
  return (
  <ThemeProvider theme={themeToUse}>
    <ProductContext.Provider value={product}>
      <ModalContext.Provider value={[isModalShown, setIsModalShown, closeModal]}>
        <AnswerModalContext.Provider value={[isAnswerModalShown, setIsAnswerModalShown]}>
          <OuterContainer onClick={closeModal}>
            <Container >
              <Section>
                {isDarkMode ? <Button onClick={toggleDarkMode}>Switch to light mode</Button> : <Button onClick={toggleDarkMode}>Switch to dark mode</Button>} <Button onClick={(e) => {
              axios.get(`/data/products/403${Math.floor(Math.random() * 10) + 44}`)
              .then((res) => {
                setProduct(res.data);
              });
              }}>Random Style</Button>
                <Heading1>Overview      </Heading1>
                <Overview/>
              </Section>
              <Section>
                <SecondaryText>
                  <Heading2>Questions & Answers</Heading2>
                </SecondaryText>
                <QuestionList />
              </Section>
              <Section>
                <Heading2 id="reviews">Ratings & Reviews</Heading2>
                <RatingsReviews />
              </Section>
            </Container>
          </OuterContainer>
        </AnswerModalContext.Provider>
      </ModalContext.Provider>
    </ProductContext.Provider>
  </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

