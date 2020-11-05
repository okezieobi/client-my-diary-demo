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

    expect(screen.getByRole('heading', { name: /MyDiary/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Get Started/i })).toBeInTheDocument();
  });
});
