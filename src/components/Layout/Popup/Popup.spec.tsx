import React from 'react';
import { render, fireEvent } from '@testing-library/react';
/* eslint-disable import/no-unresolved */

import { Popup } from '@components/Layout/Popup';

describe('<Popup />', () => {
  it('should render popup modal', () => {
    const onHandleOpen = jest.fn();
    const { getByRole } = render(<Popup open={true} onHandleOpen={onHandleOpen} />);

    expect(getByRole(/dialog/i)).toBeInTheDocument();
  });

  it('should trigger a click event', async () => {
    const onHandleOpen = jest.fn();
    render(<Popup open={true} onHandleOpen={onHandleOpen} />);
    const button: HTMLButtonElement | null = document.querySelector('.close');
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    fireEvent.click(button!);

    expect(onHandleOpen).toHaveBeenCalledTimes(1);
  });
});
