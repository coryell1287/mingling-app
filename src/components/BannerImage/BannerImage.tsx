import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import classes from '@components/BannerImage/bannerImage.css';

export function BannerImage(): React.ReactElement {
  return (
    <>
      <Jumbotron bsPrefix={classes.jumbotron}>
        <section className={classes.center}>
          <h1 className={classes.h1}>Banner Image!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or
            information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </section>
      </Jumbotron>
    </>
  );
}
