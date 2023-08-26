import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';
import axios from 'axios';
import {theme} from '../Styles/LayoutStyles.jsx'
import {DropDownContainer, DropDownButton, DropDownContent, DropDownItem, AddToCartLayout, Button} from '../Styles/OverviewStyles.jsx'




const AddToBag = () => {
  return(<Button>Add to Cart</Button>);
}

const Favorite = () => {
  return(<Button>Favorite</Button>);
}

const AddToCart =
({styles, selectedStyle}) => {
  const [hoverSize, setHoverSize] = React.useState(-1);
  const [hoverQuantity, setHoverQuantity] = React.useState(-1);
  const [sizeDropDown, setSizeDropDown] = React.useState("hidden");
  const [quantityDropDown, setQuantityDropDown] = React.useState("hidden");
  //const [numberInStock, setNumberInStock] = React.useState(0);
  const [skus, setSkus] = React.useState(styles.results[selectedStyle].skus);
  const [sizeIndex, setSizeIndex] = React.useState(-1);
  const [quantityIndex, setQuantityIndex] = React.useState(-1);
  var sizes = [];
  var numberInStock = [];
  for (let sku in skus) {
    if (skus[sku].quantity > 0) {
      sizes.push(skus[sku].size);
      numberInStock.push(skus[sku].quantity);
    }
  }
  var sizePlaceholder = sizes.length > 0 ? 'SELECT SIZE' : 'OUT OF STOCK';
  var quantity = [];
  var index = 0;
  for (let i = 1; i <= (numberInStock[sizeIndex] > 15 ? 15 : numberInStock[sizeIndex]); i++){
    quantity.push(i);
  }
  return(
    <AddToCartLayout>
  <DropDownContainer
    data-testid="sizeMenu"
    onMouseEnter={(e) => {setSizeDropDown("visible")}}
    onMouseLeave={(e) => {setSizeDropDown("hidden")}}>
    <DropDownButton>
      {sizeIndex < 0 ? sizePlaceholder : sizes[sizeIndex]}
    </DropDownButton>
    <DropDownContent data-testid="sizeOptions" style={{visibility: sizeDropDown}}>
      {sizes.map((size) => {
        var selectedIndex = index;
        var backgroundColor = hoverSize === selectedIndex ? theme.colors.secondary : theme.colors.primary;
        index++;
      return(
      <DropDownItem
        key={'sizeDropDown' + index}
        style={{backgroundColor: backgroundColor}}
        onClick={(e) => {setSizeIndex(selectedIndex)}}
        onMouseEnter={(e) => {setHoverSize(selectedIndex)}}
        onMouseLeave={(e) => {setHoverSize(-1)}}>
          {size}
      </DropDownItem>) })}
    </DropDownContent>
  </DropDownContainer>
  <DropDownContainer
    data-testid="quantityMenu"
    onMouseEnter={(e) => {setQuantityDropDown("visible")}}
    onMouseLeave={(e) => {setQuantityDropDown("hidden")}}>
    <DropDownButton>
      {quantityIndex < 0 ? '-' : quantityIndex}
    </DropDownButton>
    <DropDownContent data-testid="quantityOptions" style={{visibility: quantityDropDown}}>
      {quantity.map((i) => {
        var backgroundColor = hoverQuantity === i ? theme.colors.secondary : theme.colors.primary;
        return(
        <DropDownItem
          key={'dropDownQuantity' + i}
          style={{backgroundColor: backgroundColor}}
          onClick={(e) => {setQuantityIndex(i)}}
          onMouseEnter={(e) => {setHoverQuantity(i)}}
          onMouseLeave={(e) => {setHoverQuantity(-1)}}>
            {i}
          </DropDownItem>)})}
    </DropDownContent>
  </DropDownContainer>
  <AddToBag />
  <Favorite />
  </AddToCartLayout>
  )
}

export {AddToCart};