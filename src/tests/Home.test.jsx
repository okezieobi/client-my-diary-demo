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

    expect(screen.getByText(/MyDiary/)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/)).toBeInTheDocument();
  });
});
