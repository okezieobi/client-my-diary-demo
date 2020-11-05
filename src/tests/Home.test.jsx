import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Home page should render', () => {
  test('Renders landing page of app for large screens', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/MyDiary/)).toBeInTheDocument();
    expect(screen.queryByText(/Get Started/)).toBeInTheDocument();
  });
});
