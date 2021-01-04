import React from 'react';
import { screen } from '@testing-library/react';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders home dashboard page of app for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/home' });

    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
