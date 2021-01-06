import React from 'react';
import { screen } from '@testing-library/react';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/profile' });

    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Number of entries/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Set reminder/i })).toBeInTheDocument();
    expect(screen.getByText('Off' || 'On')).toBeInTheDocument();
  });
});
