import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import RatingsReviews from './components/rr/RatingsReviews.jsx';
import QuestionList from './components/qa/QuestionList.jsx';
import { Overview } from './components/Overview/Overview.jsx'

const theme = {
  colors: {
    primary: 'blue',
    secondary: 'steelblue',
    background: '	#f0f8ff',
    text: '#5A5A5A',
  },
  fonts: {
    main: '"Helvetica Neue", sans-serif',
  },
};

const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.main};
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Heading1 = styled.h1`
  color: ${(props) => props.theme.colors.primary};
`;

const Heading2 = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
`;

const App = () => {

  return (
    // <div>
    //   <h1>Hello World</h1>
  <ThemeProvider theme={theme}>
    <Container>
      <Section>
        <Heading1>Overview</Heading1>
        <Overview/>
      </Section>
      <Section>
        <Heading2>Questions & Answers</Heading2>
        <QuestionList />
      </Section>
      <Section>
        <Heading2>Ratings & Reviews</Heading2>
        <RatingsReviews />
      </Section>
    </Container>
  </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));