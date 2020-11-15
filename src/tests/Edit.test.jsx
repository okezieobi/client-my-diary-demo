import { screen } from '@testing-library/react';

import utils from './utils';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    utils.renderWithRouter('/home/entry/edit');

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
  });
});
