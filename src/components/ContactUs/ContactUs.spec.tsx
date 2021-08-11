import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act as rhAct } from '@testing-library/react-hooks';

import { ContactUs } from '@components/ContactUs';
import { useModal } from '@components/ContactUs/useModal';

describe('<ContactUs/>', () => {
  it('should load the ContactUs component', () => {
    expect.assertions(1);
    const { queryByLabelText } = render(<ContactUs />);

    expect(queryByLabelText(/contact form/i)).toBeInTheDocument();
  });
});

describe('useModal', () => {
  it('should submit the feedback form', async () => {
    expect.assertions(5);
    const { result } = renderHook(useModal);
    const setOpen = jest.spyOn(result.current, 'setOpen');
    const handleSubmit = jest.spyOn(result.current, 'handleSubmit');

    rhAct(() => {
      result.current.handleSubmit({ name: 'Carl' });
      result.current.setOpen(true);
    });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Carl' });
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(true);
    expect(open).toBeTruthy();
  });

  it('should setOpen to false after 5000', async () => {
    expect.assertions(1);
    const { result } = renderHook(useModal);
    jest.useFakeTimers();

    rhAct(() => {
      result.current.setOpen(true);
      jest.runAllTimers();
    });

    expect(result.current.open).toBeFalsy();
  });
});
