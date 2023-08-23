import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import RatingsReviews from './components/rr/RatingsReviews.jsx';
import QuestionList from './components/qa/QuestionList.jsx';
import { Overview } from './components/Overview/Overview.jsx'
import {ProductContext} from './contexts.js'
import {sampleProduct} from './components/Overview/sampleData.js';
import {Container, Section, Heading1, Heading2, theme} from './components/Styles/LayoutStyles.jsx';


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
          <Heading2>Questions & Answers</Heading2>
          <QuestionList />
        </Section>
        <Section>
          <Heading2>Ratings & Reviews</Heading2>
          <RatingsReviews />
        </Section>
      </Container>
    </ProductContext.Provider>
  </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
