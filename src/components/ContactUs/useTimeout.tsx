import React from 'react';

export const useTimeout = (): {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleTimeOut: (bool: boolean) => void;
} => {
  const [open, setOpen] = React.useState(false);

  function handleTimeOut(bool: boolean) {
    const timeout = setTimeout(() => {
      setOpen(bool);
      if (timeout) {
        clearTimeout(timeout);
      }
    }, 5000);
  }

  return { open, setOpen, handleTimeOut };
};
