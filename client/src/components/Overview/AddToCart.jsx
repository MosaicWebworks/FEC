import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';
import axios from 'axios';
import {theme} from '../Styles/LayoutStyles.jsx'

const DropDownContainer = styled.div`
  position: relative;
  width: 100%
`
const DropDownButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: .75em;
  padding-bottom: .75em;
  position: absolute;
  width: 100%;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text
  };
`

const DropDownContent = styled.ul`
  position: absolute;
  top: 1.5em;
  width: inherit;
  background-color: ${theme.colors.secondary};
  list-style: none;
  padding: 0;
  cursor: pointer;
`

const DropDownItem = styled.li`
  padding: 5px;
  color: ${theme.colors.textContrast};
`

const AddToCartLayout = styled.div`
  display: grid;
  height: 5em;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "size   number"
                       "add    favorite";
  column-gap: 15px;
  row-gap: 15px;
`

const AddToBag = () => {
  return(<button>Add to Cart</button>);
}

const Favorite = () => {
  return(<button>Favorite</button>);
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
  <DropDownContainer data-testid="sizeMenu" onMouseEnter={(e) => {setSizeDropDown("visible")}} onMouseLeave={(e) => {setSizeDropDown("hidden")}}>
    <DropDownButton sizeIndex={sizeIndex}>
      {sizeIndex < 0 ? sizePlaceholder : sizes[sizeIndex]}
    </DropDownButton>
    <DropDownContent data-testid="sizeOptions" style={{visibility: sizeDropDown}}>
      {sizes.map((size) => {
        var selectedIndex = index;
        var backgroundColor = hoverSize === selectedIndex ? theme.colors.primary : theme.colors.secondary;
        index++;
      return(<DropDownItem key={'sizeDropDown' + index} style={{backgroundColor: backgroundColor}} onClick={(e) => {setSizeIndex(selectedIndex)}} onMouseEnter={(e) => {setHoverSize(selectedIndex)}} onMouseLeave={(e) => {setHoverSize(-1)}}>{size}</DropDownItem>) })}
    </DropDownContent>
  </DropDownContainer>
  <DropDownContainer data-testid="quantityMenu" onMouseEnter={(e) => {setQuantityDropDown("visible")}} onMouseLeave={(e) => {setQuantityDropDown("hidden")}}>
    <DropDownButton>
      {quantityIndex < 0 ? '-' : quantityIndex}
    </DropDownButton>
    <DropDownContent data-testid="quantityOptions" style={{visibility: quantityDropDown}}>
      {quantity.map((i) => {
        var backgroundColor = hoverQuantity === i ? theme.colors.secondary : theme.colors.primary;
        return(<DropDownItem key={'dropDownQuantity' + i} style={{backgroundColor: backgroundColor}} onClick={(e) => {setQuantityIndex(i)}} onMouseEnter={(e) => {setHoverQuantity(i)}} onMouseLeave={(e) => {setHoverQuantity(-1)}}>{i}</DropDownItem>)})}
    </DropDownContent>
  </DropDownContainer>
  <AddToBag />
  <Favorite />
  </AddToCartLayout>
  )
}

export {AddToCart};