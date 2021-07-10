import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { updateTheme } from '@components/ThemeSwitcher/updateTheme';
import { saveThemeToStorage } from '@components/Header';
import { ThemeSwitcher, useStorage } from '@components/ThemeSwitcher';

import { MockStorage } from '../../mocks/MockStorage';

describe('<ThemeSwitcher />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new MockStorage(),
    });
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

  it('should toggle checkbox when user clicks, setting theme to dark', () => {
    expect.assertions(2);
    const event = { target: { dataset: { mode: 'light-mode' } } };

    const handleCheck = jest.fn(() => {
      if (event.target.dataset.mode === 'light-mode') {
        saveThemeToStorage('dark-mode');
      }
    });

    render(<ThemeSwitcher mode={'dark-mode'} onHandleCheck={handleCheck} />);
    const container = document.querySelector('[data-checkbox]');

    if (container) {
      fireEvent.click(container);
    }

    expect(handleCheck).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('theme')).toBe('dark-mode');
  });

  it('should toggle checkbox when user clicks, setting theme to light', () => {
    expect.assertions(2);
    const event = { target: { dataset: { mode: 'dark-mode' } } };

    const handleCheck = jest.fn(() => {
      if (event.target.dataset.mode === 'dark-mode') {
        saveThemeToStorage('light-mode');
      }
    });

    render(<ThemeSwitcher mode={'light-mode'} onHandleCheck={handleCheck} />);
    const container = document.querySelector('[data-checkbox]');

    if (container) {
      fireEvent.click(container);
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
