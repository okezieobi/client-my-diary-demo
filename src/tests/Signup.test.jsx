import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Signup page should render', () => {
  test('Renders signup page of app for large screens', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Sign up/)).toBeInTheDocument();
  });

  test('navigates to dashboard when signup is successfull', () => {});
});
