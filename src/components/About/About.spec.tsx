import React from 'react';
import { render } from '@testing-library/react';

import { About } from '@components/About';

describe('<About/>', function () {
  it('should load the About component', function () {
    expect.assertions(1);
    const { getByText } = render(<About />);
    expect(getByText(/about us/i)).toBeInTheDocument();
  });
});
