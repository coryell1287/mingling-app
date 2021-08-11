import React, { useState } from 'react';

interface UseModal {
  open: boolean;
  setOpen: (bool: boolean) => void;
  handleSubmit<T>(data: T): void;
}

export const useModal = (): UseModal => {
  const [open, handleOpen] = useState(false);

  function handleSubmit<T>(data: T): void {
    setOpen(true);
  }

  function setOpen(bool: boolean): void {
    handleOpen(bool);
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      handleOpen(false);
    }, 5000);
  }

  return { open, setOpen, handleSubmit };
};
