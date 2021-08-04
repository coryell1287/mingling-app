import React from 'react';

import { updateTheme } from '@components/ThemeSwitcher/updateTheme';
import classes from '@components/ThemeSwitcher/themeSwitcher.css';

export interface AppTheme {
  mode: string | null;
}

type Props = {
  onHandleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mode: Theme;
};

type Theme = 'light-mode' | 'dark-mode';

export const ThemeSwitcher = ({ onHandleCheck, mode }: Props): React.ReactElement => {
  React.useEffect(() => {
    updateTheme(mode as Theme);
  }, [mode]);

  return (
    <div className={`${classes.switch_box}`}>
      <input
        data-mode={mode}
        type="checkbox"
        id="themeSwitch"
        name="theme-switch"
        onChange={onHandleCheck}
        className={`${classes['theme-switch__input']}`}
        data-checkbox="checkbox"
      ></input>
      <label htmlFor="themeSwitch" className={`${classes['theme-switch__label']}`}>
        <span id="switchTheme">Switch theme</span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
