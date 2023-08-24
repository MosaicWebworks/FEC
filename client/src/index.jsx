import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import RatingsReviews from './components/rr/RatingsReviews.jsx';
import QuestionList from './components/qa/QuestionList.jsx';
import { Overview } from './components/Overview/Overview.jsx'
import {ProductContext, ModalContext, AnswerModalContext} from './contexts.js'
import {sampleProduct} from './components/Overview/sampleData.js';
import {Container, Section, theme, SecondaryText, darkTheme, OuterContainer} from './components/Styles/LayoutStyles.jsx';

const Heading1 = styled.h1`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const Heading2 = styled.h2`
  color: ${(props) => props.theme.colors.textSecondary};
`;
// document.body.style = `background: ${theme.colors.background};`;

const App = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isAnswerModalShown, setIsAnswerModalShown] = useState(false);
  const [product, setProduct] = React.useState(sampleProduct);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeToUse, setThemeToUse] = useState(theme);
  const closeModal = () => {
    if (isModalShown || isAnswerModalShown) {
      console.log('clicked off');
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
          <OuterContainer>
            <Container onClick={closeModal}>
              <Section>
                {isDarkMode ? <button onClick={toggleDarkMode}>Switch to light mode</button> : <button onClick={toggleDarkMode}>Switch to dark mode</button>}
                <Heading1>Overview      <button onClick={(e) => {
              axios.get(`http://localhost:3000/data/products/403${Math.floor(Math.random() * 10) + 44}`)
              .then((res) => {
                setProduct(res.data);
              });
              }}>Random Style</button></Heading1>
                <Overview/>
              </Section>
              <Section>
                {/* secondary color for heading */}
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

