import { screen } from '@testing-library/react';

import utils from './utils';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    utils.renderWithRouter('/profile');

    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Number of entries/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Set reminder/i })).toBeInTheDocument();
    expect(screen.getByText('Off' || 'On')).toBeInTheDocument();
  });
});
