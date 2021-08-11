import React, { Suspense, ReactElement } from 'react';

import { useModal } from '@components/ContactUs/useModal';
import { Section } from '@components/Layout/Section';
import { ContactForm } from '@components/ContactForm';

const Popup = React.lazy(() => {
  return import(/* webpackPrefetch: true */ '../Layout/Popup/Popup');
});

export const ContactUs = (): ReactElement => {
  const { open, setOpen, handleSubmit } = useModal();

  function handleData(data: FormInput): void {
    handleSubmit(data);
  }

  return (
    <Section>
      <ContactForm onSubmit={handleData} />
      <Suspense fallback={<></>}>
        <Popup open={open} onHandleOpen={() => setOpen(false)} />
      </Suspense>
    </Section>
  );
};
