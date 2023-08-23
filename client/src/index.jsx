import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import RatingsReviews from './components/rr/RatingsReviews.jsx';
import QuestionList from './components/qa/QuestionList.jsx';
import { Overview } from './components/Overview/Overview.jsx'
import {ProductContext} from './contexts.js'
import {sampleProduct} from './components/Overview/sampleData.js';
import {Container, Section, theme} from './components/Styles/LayoutStyles.jsx';

const Heading1 = styled.h1`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const Heading2 = styled.h2`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const App = () => {
  const [product, setProduct] = React.useState(sampleProduct);
  return (
    // <div>
    //   <h1>Hello World</h1>
  <ThemeProvider theme={theme}>
    <ProductContext.Provider value={product}>
      <Container>
        <Section>
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
          <Heading2>Ratings & Reviews</Heading2>
          <RatingsReviews />
        </Section>
      </Container>
    </ProductContext.Provider>
  // </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

