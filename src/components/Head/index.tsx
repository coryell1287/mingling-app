import React, { ReactElement } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

export function Head(): ReactElement {
  return (
    <Helmet>
      <meta name="title" content="mingling-app" />
      <meta name="description" content="Fresh new app" />
      <meta name="keywords" content="social media, productivity" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="12 days" />
      <meta name="author" content="Creative type" />
      <title>mingling-app</title>
    </Helmet>
  );
}
