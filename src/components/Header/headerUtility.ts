export const saveThemeToStorage = (value: Theme): void => {
  // console.log('called', value);
  if (value) {
    localStorage.setItem('theme', value);
  }
};
