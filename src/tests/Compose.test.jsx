import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { AppTest } from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/home/entry/compose']}>
        <AppTest />
      </MemoryRouter>,
    );

    expect(getByText(/Submit/)).toBeInTheDocument();
  });
});
