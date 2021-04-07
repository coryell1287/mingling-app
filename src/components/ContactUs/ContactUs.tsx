import React from 'react';

import { Section } from '@components/Layout/Section';
import { ContactForm } from '@components/ContactForm';

export const ContactUs = (): React.ReactElement => {
  return (
    <Section>
      <ContactForm />
    </Section>
  );
};
