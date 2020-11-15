import { screen } from '@testing-library/react';

import utils from './utils';

describe('Home dashboard page should render', () => {
  test('Renders home dashboard page of app for large screens', () => {
    utils.renderWithRouter('/home');

    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
