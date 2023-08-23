import React from 'react';
import axios from 'axios';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {Overview} from '../client/src/components/Overview/Overview';
import {AddToCart} from '../client/src/components/Overview/AddToCart';
import {ProductInfo} from '../client/src/components/Overview/ProductInfo';
import {sampleProduct, sampleStyles} from '../client/src/components/Overview/sampleData.js';
import {ProductDetails} from '../client/src/components/Overview/ProductDetails';
import {ProductContext} from '../client/src/contexts.js'

jest.mock('axios');

describe ('Overview', () => {
  test('Main overview image is shown', () => {
    axios.get.mockResolvedValue({data: sampleStyles});
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    let mainImage = screen.getByTestId('main-image');
    expect(mainImage).toBeTruthy();
  });
  test('Main overview image has alt text', () => {
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    let mainImage = screen.getByTestId('main-image');
    expect(mainImage.alt).toBeTruthy();
  });
  test('Left arrow doesn\'t render when on first image', () => {
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    expect(screen.queryByTestId('leftArrow')).not.toBeInTheDocument();
  })
  test('Left arrow appears when not on first image', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    await user.click(screen.getByTestId('rightArrow'));
    expect(screen.queryByTestId('leftArrow')).toBeInTheDocument();
  })
  test('SELECT SIZE is default value for size dropdown', () => {
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    let sizeMenu = screen.getByTestId('sizeMenu')
    expect(sizeMenu).toHaveTextContent('SELECT SIZE');

  })
  test('Quantity select dropdown appears on mouseenter', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    let quantityMenu = screen.getByTestId('quantityMenu');
    let quantityOptions = screen.getByTestId('quantityOptions');
    await user.hover(quantityMenu);
    expect(quantityOptions).toBeVisible();
  })
  test('Size select dropdown appears on mouseenter', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    let sizeMenu = screen.getByTestId('sizeMenu');
    let sizeOptions = screen.getByTestId('sizeOptions');
    await user.hover(sizeMenu);
    expect(sizeOptions).toBeVisible();
  })
  test('Quantity select dropdown disappears on mouseenter', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    let quantityMenu = screen.getByTestId('quantityMenu');
    let quantityOptions = screen.getByTestId('quantityOptions');
    await user.hover(quantityMenu);
    await user.unhover(quantityMenu);
    expect(quantityOptions).not.toBeVisible();
  })
  test('Size select dropdown disappears on mouseenter', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    let sizeMenu = screen.getByTestId('sizeMenu');
    let sizeOptions = screen.getByTestId('sizeOptions');
    await user.hover(sizeMenu);
    await user.unhover(sizeMenu);
    expect(sizeOptions).not.toBeVisible();
  })
  test('Big Image has title', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    await user.click(screen.getByTestId('main-image'));
    let bigImage = screen.getByTestId('bigImage');
    expect(bigImage.title).toBeTruthy();
  })
  test('Big Image dissapears on click', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    await user.click(screen.getByTestId('main-image'));
    let bigImage = screen.queryByTestId('bigImage');
    await user.click(bigImage);
    expect(screen.queryByTestId('bigImage')).not.toBeInTheDocument();
  })
  test('Big Image dissapears on mouse exit', async () => {
    const user = userEvent.setup();
    render(<ProductContext.Provider value={sampleProduct}><Overview/></ProductContext.Provider>);
    await user.click(screen.getByTestId('main-image'));
    let bigImage = screen.queryByTestId('bigImage');
    await user.hover(bigImage);
    await user.unhover(bigImage);
    expect(screen.queryByTestId('bigImage')).not.toBeInTheDocument();
  })
  test('Product details renders slogan', () => {
    render(<ProductContext.Provider value={sampleProduct}><Overview /></ProductContext.Provider>);
    expect(screen.getByText(sampleProduct.slogan)).toBeTruthy();
  })
})