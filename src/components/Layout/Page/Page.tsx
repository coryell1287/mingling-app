import React from 'react';

import { Header } from '@components/Header';
import { Head } from '@components/Head';

type PageProps = {
  children: React.ReactNode;
};

export const Page = ({ children }: PageProps): React.ReactElement => {
  return (
    <>
      <Head />
      <Header />
      {children}
    </>
  );
};
