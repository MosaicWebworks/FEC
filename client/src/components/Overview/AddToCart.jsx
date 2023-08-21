import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';

const DropDownContainer = styled.div`
  border: 1px solid magenta;
  display: grid;
  position: relative;
  margin: 15px;
`
const DropDownButton = styled.div`
  position: absolute;
  width: 100%;
  background-color: white:
`

const DropDownContent = styled.ul`
  position: absolute;
  visibility: hidden;
  width: 100%;
  background-color: white;
`
const AddToCartLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-tepmlate-rows: 1fr 1fr;
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

{/* <DropDownContainer>
<DropDownButton onClick={(e) => {(showDropDown === "hidden") ? setShowDropDown("visible") : setShowDropDown("hidden")}}>SELECT SIZE</DropDownButton>
<DropDownContent style={{visibility: showDropDown}}>

</DropDownContent>
</DropDownContainer> */}

const AddToCart =
({styles, selectedStyle}) => {
  const [sizeDropDown, setSizeDropDown] = React.useState("hidden");
  const [quantityDropDown, setQuantityDropDown] = React.useState("hidden");
  //const [numberInStock, setNumberInStock] = React.useState(0);
  const [skus, setSkus] = React.useState(styles.results[selectedStyle].skus);
  const [sizeIndex, setSizeIndex] = React.useState(0);
  var sizes = [];
  var numberInStock = [];
  for (let sku in skus) {
    sizes.push(skus[sku].size);
    numberInStock.push(skus[sku].quantity);
  }
  var quantity = [];
  var index = 0;
  for (let i = 1; i <= (numberInStock[sizeIndex] > 15 ? 15 : numberInStock[sizeIndex]); i++){
    quantity.push(i);
  }
  return(
    <AddToCartLayout>
  <DropDownContainer>
    <DropDownButton onClick={(e) => {(sizeDropDown === "hidden") ? setSizeDropDown("visible") : setSizeDropDown("hidden")}}>
      SELECT SIZE
    </DropDownButton>
    <DropDownContent style={{visibility: sizeDropDown}}>
      {sizes.map((size) => {
        var sizeIndex = index;
        index++;
      return(<li onClick={(e) => {setSizeIndex(sizeIndex)}}>{size}</li>)})}
    </DropDownContent>
  </DropDownContainer>
  <DropDownContainer>
    <DropDownButton onClick={(e) => {(quantityDropDown === "hidden") ? setQuantityDropDown("visible") : setQuantityDropDown("hidden")}}>
      1
    </DropDownButton>
    <DropDownContent style={{visibility: quantityDropDown}}>
      {quantity.map((i) => <li>{i}</li>)}
    </DropDownContent>
  </DropDownContainer>
  <AddToBag />
  <Favorite />
  </AddToCartLayout>
  )
}

export {AddToCart};