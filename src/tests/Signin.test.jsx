import { screen } from '@testing-library/react';

import utils from './utils';

describe('Signin page should render', () => {
  test('Renders signin page of app for large screens', () => {
    utils.renderWithRouter('/signin');

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });
});
