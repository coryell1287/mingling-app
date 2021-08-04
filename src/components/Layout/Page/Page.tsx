import React from 'react';

type PageProps = {
  children: React.ReactNode;
};

export const Page = ({ children }: PageProps): React.ReactElement => {
  return <>{children}</>;
};
