import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import HomeBGOne from '../../images/Home_1.svg';
import HomeBGTwo from '../../images/Home_2.svg';
import HomeBGThree from '../../images/Home_3.svg';
import Root from '../layouts/Root';

const useStyles = makeStyles(() => ({
  homeBackdrop1: {
    backgroundImage: `url(${HomeBGOne})`,
  },
  homeBackdrop2: {
    backgroundImage: `url(${HomeBGTwo})`,
  },
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

export default function Home({ isAuth }) {
  const classes = useStyles();

  if (isAuth) return <Redirect to="/home" push />;
  return (
    <>
      <CssBaseline />
      <Root href="/signin" headerLink="Already have account ? Sign in">
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

Home.propTypes = {
  isAuth: propTypes.bool,
};

Home.defaultProps = {
  isAuth: false,
};
