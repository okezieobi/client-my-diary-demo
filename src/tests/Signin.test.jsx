import React from 'react';
import { screen } from '@testing-library/react';

import utils from './utils';
import App from '../App';

describe('Signin page should render', () => {
  test('Renders signin page of app for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/signin' });

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });
});
