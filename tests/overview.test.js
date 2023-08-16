import React from 'react';
import {render, screen} from '@testing-library/react';
import {Overview} from '../client/src/components/Overview/Overview';

describe ('Overview', () => {
  test('Main overview image is shown', () => {
    render(<Overview/>);
    let mainImage = screen.getByTestId('main-image');
    expect(mainImage).toBeTruthy();
  });
  test('Main overview image has alt text', () => {
    render(<Overview/>);
    let mainImage = screen.getByTestId('main-image');
    expect(mainImage.alt).toBeTruthy();
  });
})