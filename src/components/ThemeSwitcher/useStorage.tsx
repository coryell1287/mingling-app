import React from 'react';

export const useStorage = (key: string): string | null => {
  const [storage, setStorage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedValue = window.localStorage.getItem(key) ? window.localStorage.getItem(key) : null;
    setStorage(storedValue);
  }, [key]);

  return storage;
};

export default useStorage;
