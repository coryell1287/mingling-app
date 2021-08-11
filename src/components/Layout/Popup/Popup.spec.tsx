import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { Popup } from '@components/Layout/Popup';
import { useModal } from '@components/ContactUs/useModal';

describe('<Popup />', () => {
  afterEach(cleanup);
  it('should render popup modal', () => {
    expect.assertions(1);
    const onHandleOpen = jest.fn();
    const { getByRole } = render(<Popup open={true} onHandleOpen={onHandleOpen} />);

    expect(getByRole(/dialog/i)).toBeInTheDocument();
  });

  it('should set open to false when the close button is clicked', async () => {
    expect.assertions(4);
    const onHandleOpen = jest.fn();
    render(<Popup open={true} onHandleOpen={onHandleOpen} />);
    const button = document.querySelector('.close') as HTMLButtonElement;
    const { result } = renderHook(useModal);
    const handleSubmit = jest.spyOn(result.current, 'handleSubmit');

    act(() => {
      result.current.handleSubmit({});
    });
    expect(button).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(result.current.open).toBeTruthy();
    fireEvent.click(button);
    act(() => {
      result.current.setOpen(false);
    });
    expect(result.current.open).toBeFalsy();
  });
});
