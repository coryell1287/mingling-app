import React, { Suspense } from 'react';
import axios from 'axios';

import { Section } from '@components/Layout/Section';
import { ContactForm } from '@components/ContactForm';
import type { FormInput } from '@components/ContactUs/types';

const Popup = React.lazy(() => {
  return import(/* webpackPrefetch: true */ '../Layout/Popup/Popup');
});

export const ContactUs = (): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  async function submitFeedback(data: FormInput): Promise<void> {
    await axios.post('/feedback', JSON.stringify(data));
    try {
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleTimeout() {
    timeout = setTimeout(() => {
      setOpen(false);
      if (timeout) {
        clearTimeout(timeout);
      }
    }, 5000);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleSubmit(data: FormInput) {
    if (data) {
      submitFeedback(data);
      setOpen(true);
      handleTimeout();
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
