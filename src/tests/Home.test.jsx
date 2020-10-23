import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

describe('Home page should render', () => {
  test('Renders landing page of app for large screens', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/MyDiary/)).toBeInTheDocument();
    expect(getByText(/Get Started/)).toBeInTheDocument();
  });
});
