import React from 'react';
import {sampleProduct} from './components/Overview/sampleData.js';

const ProductContext = React.createContext(sampleProduct);

export {ProductContext};