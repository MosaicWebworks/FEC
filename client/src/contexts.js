import React from 'react';
import {sampleProduct} from './components/Overview/sampleData.js';

const ProductContext = React.createContext(sampleProduct);
const ModalContext = React.createContext();
const PhotoContext = React.createContext();
const AnswerModalContext = React.createContext();
export {
  ProductContext,
  ModalContext,
  PhotoContext,
  AnswerModalContext
};