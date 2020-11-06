import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    render(
      <MemoryRouter initialEntries={['/home/entry']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
  });
});
