import React from 'react';
import styled from 'styled-components';

const Text = styled.div`color: red;`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 3fr 1fr;
  grid-template-areas: "one two" "three three";
  column-gap: 15px;
  row-gap: 15px;
`
const One = styled.div`
  grid-area: one;
  border: 1px solid red;
`
const Two = styled.div`
  grid-area: two;
  border: 1px solid blue;
`
const Three = styled.div`
  grid-area: three;
  border: 1px solid green;
`

const Overview = () => {

  return(
    <Container>
      <One>Overview Image</One>
      <Two>Product Info</Two>
      <Three>Product Information details</Three>
    </Container>

  )
}

export { Overview };