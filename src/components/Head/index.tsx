import React, { ReactElement } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

export function Head(): ReactElement {
  const location = useLocation();
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    console.log(location, 'location');
    setTitle(function () {
      return location.pathname === '/' ? 'Home' : location.pathname.replace(/\b[a-z]/, c => c.toUpperCase());
    });
  }, [location]);

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
      <title>{title}</title>
    </Helmet>
  );
}
