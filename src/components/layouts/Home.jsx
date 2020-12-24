import React from 'react';
/*
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import TimerIcon from '@material-ui/icons/Timer';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
*/

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import HomeBGOne from '../../images/Home_1.svg';
import HomeBGTwo from '../../images/Home_2.svg';
import HomeBGThree from '../../images/Home_3.svg';
import Root from './Root';

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
    height: '100%',
    backgroundSize: 'contain',
  },
}));

export default function Home() {
  const classes = useStyles();

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
