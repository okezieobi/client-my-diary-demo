import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/Number of entries/)).toBeInTheDocument();
    expect(screen.queryByText(/Set reminder/)).toBeInTheDocument();
  });
});
