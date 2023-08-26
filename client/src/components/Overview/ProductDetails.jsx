import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';
import {theme} from '../Styles/LayoutStyles.jsx'

const ProductDetails = ({product}) => {
  return(
    <div>
      <h3>{product.slogan}</h3>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;