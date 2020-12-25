import { screen } from '@testing-library/react';

import utils from './utils';

describe('Home page should render', () => {
  test('Renders landing page of app for large screens', () => {
    utils.renderWithRouter();

    expect(screen.getByRole('heading', { name: /MyDiary/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });
});
