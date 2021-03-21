import React from 'react';
import { screen } from '@testing-library/react';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/profile' });

    expect(screen.getByRole('heading', { name: /Full Name/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Username/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Number of entries/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Created on/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Updated on/i })).toBeInTheDocument();
  });
});
