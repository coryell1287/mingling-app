import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactForm } from '@components/ContactForm';

describe('<ContactForm />', function () {
  it('should type characters into input fields', function () {
    const { getByTestId } = render(<ContactForm />);
    userEvent.type(getByTestId(/email/i), 'workmail@gmail.com');
    userEvent.type(getByTestId(/name/i), 'John Doe');
    userEvent.type(getByTestId(/textarea/i), 'hello there');

    expect(getByTestId(/email/i)).toHaveValue('workmail@gmail.com');
    expect(getByTestId(/name/i)).toHaveValue('John Doe');
    expect(getByTestId(/textarea/i)).toHaveValue('hello there');
    expect.assertions(3);
  });

  it('should submit form when button is clicked', function () {
    const { getByTestId } = render(<ContactForm />);
    expect(getByTestId(/submit/i)).toBeInTheDocument();
  });
});
