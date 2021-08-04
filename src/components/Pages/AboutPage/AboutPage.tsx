import React from 'react';

import { BannerImage } from '@components/BannerImage';
import { Header } from '@components/Header';
import { Head } from '@components/Head';
import { About } from '@components/About';
import { Features } from '@components/Features';
import { InfoSection } from '@components/InfoSection';
import { ContactUs } from '@components/ContactUs';

export const AboutPage = (): React.ReactElement => {
  return (
    <>
      <Head />
      <Header />
      <BannerImage />
      <About />
      <Features />
      <InfoSection />
      <ContactUs />
    </>
  );
};

export default AboutPage;
