import React, { Suspense } from 'react';

import { useTimeout } from '@components/ContactUs/useTimeout';
import { Section } from '@components/Layout/Section';
import { ContactForm } from '@components/ContactForm';
import type { FormInput } from '@components/ContactUs/types';

const Popup = React.lazy(() => {
  return import(/* webpackPrefetch: true */ '../Layout/Popup/Popup');
});

export const ContactUs = (): React.ReactElement => {
  // const [open, setOpen] = React.useState(false);
  const { open, setOpen, handleTimeOut } = useTimeout();

  function handleOpen(): void {
    setOpen(true);
  }

  function handleSubmit(data: FormInput): void {
    if (data) {
      setOpen(true);
      handleTimeOut(false);
    }
  }

  return (
    <Section>
      <ContactForm onSubmit={handleSubmit} />
      <Suspense fallback={<></>}>
        <Popup open={open} onHandleOpen={handleOpen} />
      </Suspense>
    </Section>
  );
};
