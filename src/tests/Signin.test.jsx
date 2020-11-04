import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Signin page should render', () => {
  test('Renders signin page of app for large screens', () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
  });
});
