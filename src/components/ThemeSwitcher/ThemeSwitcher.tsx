import React, { ChangeEvent, ReactElement } from 'react';

import { updateTheme } from '@components/ThemeSwitcher/updateTheme';
import classes from '@components/ThemeSwitcher/themeSwitcher.css';

type Props = {
  onHandleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  mode: Theme;
};

export const ThemeSwitcher = ({ onHandleCheck, mode }: Props): ReactElement => {
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
