import type { ThemeMode } from '@components/ThemeSwitcher/theme-mode-types';
import { lightMode, darkMode } from '@components/ThemeSwitcher/theme-mode';

type Theme = 'light-mode' | 'dark-mode';

export const updateTheme = (mode: Theme): void => {
  const body = document.querySelector('body');
  const checkbox = document.getElementById('themeSwitch') as HTMLInputElement;
  let themeMode: ThemeMode;

  if (mode === 'light-mode') {
    themeMode = lightMode;
    if (checkbox) checkbox.checked = false;
  } else {
    themeMode = darkMode;
    if (checkbox) checkbox.checked = true;
  }

  const attribute = body?.dataset.theme;
  if (attribute) {
    body?.removeAttribute('data-theme');
  }

  body?.setAttribute('data-theme', mode);
  Object.entries(themeMode).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};
