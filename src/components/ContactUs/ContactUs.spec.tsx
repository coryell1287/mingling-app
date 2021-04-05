import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactUs } from '@components/ContactUs';

describe('<Contact/>', function () {
  it('should type characters into input fields', function () {
    const { getByTestId } = render(<ContactUs />);
    userEvent.type(getByTestId(/email/i), 'workmail@gmail.com');
    userEvent.type(getByTestId(/name/i), 'John Doe');
    userEvent.type(getByTestId(/textarea/i), 'hello there');

    expect(getByTestId(/email/i)).toHaveValue('workmail@gmail.com');
    expect(getByTestId(/name/i)).toHaveValue('John Doe');
    expect(getByTestId(/textarea/i)).toHaveValue('hello there');
    expect.assertions(3);
  });

  it('should submit form when button is clicked', function () {
    const { getByTestId } = render(<ContactUs />);
    expect(getByTestId(/submit/i)).toBeInTheDocument();
  });
});
