import React from 'react';

import { BannerImage } from '@components/BannerImage';
import { About } from '@components/About';
import { Features } from '@components/Features';
import { InfoSection } from '@components/InfoSection';
import { ContactUs } from '@components/ContactUs';
import { Page } from '@components/Layout/Page';

export const HomePage = (): React.ReactElement => {
  return (
    <>
      <Page>
        <BannerImage />
        <About />
        <Features />
        <InfoSection />
        <ContactUs />
      </Page>
    </>
  );
};

export default HomePage;
