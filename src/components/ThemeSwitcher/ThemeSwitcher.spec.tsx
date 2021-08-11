import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import { updateTheme } from '@components/ThemeSwitcher/updateTheme';
import * as headerUtility from '@components/Header/headerUtility';
import { ThemeSwitcher, useStorage } from '@components/ThemeSwitcher';

import { MockStorage } from '../../mocks/MockStorage';

describe('<ThemeSwitcher />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new MockStorage(),
    });
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should render ThemeSwitcher', () => {
    expect.assertions(1);
    const handleCheck = jest.fn();
    render(<ThemeSwitcher mode={'light-mode'} onHandleCheck={handleCheck} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should call useStorage and return "null" when theme is not set', () => {
    expect.assertions(1);
    const { result } = renderHook(() => useStorage('theme'));
    expect(result.current).toBeNull();
  });

  it('should call useStorage and return theme when theme is not set', () => {
    expect.assertions(2);
    headerUtility.saveThemeToStorage('dark-mode');
    const { result: first } = renderHook(() => useStorage('theme'));
    expect(first.current).toBe('dark-mode');

    headerUtility.saveThemeToStorage('light-mode');
    const { result: second } = renderHook(() => useStorage('theme'));
    expect(second.current).toBe('light-mode');
  });

  it('should toggle checkbox when user clicks, setting theme to dark', () => {
    expect.assertions(2);
    const event = { target: { dataset: { mode: 'light-mode' } } };

    const handleCheck = jest.fn(() => {
      if (event.target.dataset.mode === 'light-mode') {
        headerUtility.saveThemeToStorage('dark-mode');
      }
    });

    render(<ThemeSwitcher mode={'dark-mode'} onHandleCheck={handleCheck} />);
    const container = document.querySelector('[data-checkbox]');

    if (container) {
      userEvent.click(container);
    }

    expect(handleCheck).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('theme')).toBe('dark-mode');
  });

  it('should toggle checkbox when user clicks, setting theme to light', () => {
    expect.assertions(2);
    const event = { target: { dataset: { mode: 'dark-mode' } } };

    const handleCheck = jest.fn(() => {
      if (event.target.dataset.mode === 'dark-mode') {
        headerUtility.saveThemeToStorage('light-mode');
      }
    });

    render(<ThemeSwitcher mode={'light-mode'} onHandleCheck={handleCheck} />);
    const container = document.querySelector('[data-checkbox]');

    if (container) {
      userEvent.click(container);
    }

    expect(handleCheck).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('theme')).toBe('light-mode');
  });

  it('should update the theme when style object is passed', () => {
    expect.assertions(2);
    const body = document.querySelector('body');
    updateTheme('dark-mode');
    expect(body?.getAttribute('data-theme')).toBe('dark-mode');
    updateTheme('light-mode');
    expect(body?.getAttribute('data-theme')).toBe('light-mode');
  });
});
