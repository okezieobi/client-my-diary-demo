import React from 'react';
import { screen } from '@testing-library/react';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/edit' });

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signout/i })).toBeInTheDocument();
  });
});
