import React from 'react';
import { render } from '@testing-library/react';

import { Home } from '@components/Home';

describe('<Home/>', function () {
  it('should load the Home component', function () {
    const component = render(<Home />);
    expect(component).toBeTruthy();
  });
});
