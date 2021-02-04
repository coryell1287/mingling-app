import React from 'react';
import { render } from '@testing-library/react';

import { Head } from '@components/Head';

describe('<Head/>', function () {
  it('should load Head', function () {
    const component = render(<Head />);
  });
});
