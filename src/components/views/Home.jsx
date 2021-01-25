import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import HomeBGThree from '../../images/Home_3.svg';
import Root from '../templates/Root';

const useStyles = makeStyles(() => ({
  homeBackdrop3: {
    backgroundImage: `url(${HomeBGThree})`,
  },
  setBackground: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '98%',
    backgroundSize: 'contain',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Root href="/login" headerLink="Already have account ? Sign in">
        <Grid className={`${classes.home} ${classes.setBackground} ${classes.homeBackdrop3}`} alignItems="center" justify="center" container>
          <Grid item>
            <Link underline="none" href="/signup" color="inherit">
              <Button color="primary" variant="contained">Get Started</Button>
            </Link>
          </Grid>
        </Grid>
      </Root>
    </>
  );
}
