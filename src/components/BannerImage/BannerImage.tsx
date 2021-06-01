import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

import classes from '@components/BannerImage/bannerImage.css';

type Attr = 'home' | 'about' | 'contact';

export function BannerImage(): React.ReactElement {
  const [page, setPage] = React.useState<Attr>('home');
  const { pathname } = useLocation();

  React.useEffect(() => {
    const path = pathname === '/' ? 'home' : (pathname.split('/').filter(Boolean)[0] as Attr);
    setPage(path);
  }, [pathname]);

  return (
    <>
      <Jumbotron bsPrefix={`${classes['image-container']} ${classes[page]}`}>
        <section className={classes.center}>
          <h1 className={classes.h1}>{page} page!</h1>
          <p>Jumbotron for images</p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </section>
      </Jumbotron>
    </>
  );
}
