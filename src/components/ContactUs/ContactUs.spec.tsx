import React from 'react';
import { render, fireEvent, act as call } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { ContactUs } from '@components/ContactUs';
import { useTimeout } from '@components/ContactUs/useTimeout';

describe('<ContactUs/>', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should load the ContactUs component', () => {
    expect.assertions(1);
    const { queryByLabelText } = render(<ContactUs />);

    expect(queryByLabelText(/contact form/i)).toBeInTheDocument();
  });

  it('should submit form', async () => {
    expect.assertions(1);
    const { queryByLabelText } = render(<ContactUs />);
    const form = queryByLabelText(/contact form/i);

    if (form) {
      await act(async () => {
        fireEvent.submit(form, { name: 'John', email: 'john@mail.com', feedback: 'it works' });
      });
    }
    expect(queryByLabelText(/contact form/i)).toBeInTheDocument();
  });

  it('should call handleTimeOut() and setOpen, setting open to false', async () => {
    expect.assertions(1);
    jest.useFakeTimers();
    const { result } = renderHook(() => useTimeout());
    call(() => {
      result.current.handleTimeOut(false);
      jest.runAllTimers();
      result.current.setOpen(false);
    });

    expect(result.current.open).toBeFalsy();
  });
});
