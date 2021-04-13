import React from 'react';

import { Section } from '@components/Layout/Section';
import { ContactForm } from '@components/ContactForm';
import type { FormInput } from '@components/ContactUs/types';

export const ContactUs = (): React.ReactElement => {
  function handleSubmit(data: FormInput) {
    console.log(data);
  }

  return (
    <Section>
      <ContactForm onSubmit={handleSubmit} />
    </Section>
  );
};
