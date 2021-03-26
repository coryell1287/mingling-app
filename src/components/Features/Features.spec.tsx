import React from 'react';
import { render } from '@testing-library/react';

import { Features } from '@components/Features';

describe('<Features/>', function () {
  it('should load the Features components', function () {
    const { getByText } = render(<Features />);
    expect(getByText(/features/i)).toBeInTheDocument();
  });
});
