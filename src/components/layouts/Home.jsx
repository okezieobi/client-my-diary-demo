import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import TimerIcon from '@material-ui/icons/Timer';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';

import Copyright from './Copyright';
import HomeBGOne from '../../images/Home_1.svg';
import HomeBGTwo from '../../images/Home_2.svg';
import HomeBGThree from '../../images/Home_3.svg';
import AuthHeader from './Auth';

const useStyles = makeStyles((theme) => ({
  iconPadding: {
    marginRight: theme.spacing(2),
  },
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
    width: '100vw',
    height: '100vh',
    backgroundSize: 'contain',
  },
  description: {
    padding: theme.spacing(3),
    opacity: 0.95,
  },
  gridItem: {
    height: '30vh',
  },
  gridHeight: {
    height: '100vh',
  },
  bronzeFont: {
    color: 'brown',
  },
  goldFont: {
    color: 'orange',
  },
  platinumFont: {
    color: 'gray',
  },
  home: {
    paddingBottom: theme.spacing(3),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AuthHeader href="/signup" headerLink="Get Started">
        <Container className={classes.home}>
          <Box my={2}>
            <Grid container>
              <Grid item xs={12} className={`${classes.setBackground} ${classes.homeBackdrop2}`}>
                <Grid className={classes.gridHeight} alignItems="center" container>
                  <Grid item xs={12} sm={4}>
                    <Paper className={classes.description}>
                      <Typography align="center" color="primary" variant="h4">My Diary App Demo</Typography>
                      <Typography align="center" color="primary" variant="h6">
                        Some really cool description of application,
                        this is just filler
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={`${classes.setBackground} ${classes.homeBackdrop3}`}>
                <Grid className={classes.gridHeight} alignItems="center" container>
                  <Grid item xs={12}>
                    <Paper className={classes.description}>
                      <Typography gutterBottom color="primary" variant="h4">Features</Typography>
                      <Grid container justify="space-evenly" spacing={4}>
                        <Grid item xs={12} sm={3}>
                          <Toolbar>
                            <LockIcon color="primary" className={classes.iconPadding} />
                            <Typography color="primary" variant="h5">Secure</Typography>
                          </Toolbar>
                          <Container>
                            <Typography color="primary" variant="h6">App is secure</Typography>
                          </Container>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Toolbar>
                            <HomeIcon color="primary" className={classes.iconPadding} />
                            <Typography color="primary" variant="h5">Reliable</Typography>
                          </Toolbar>
                          <Container>
                            <Typography color="primary" variant="h6">App is reliable</Typography>
                          </Container>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Toolbar>
                            <LocalConvenienceStoreIcon color="primary" className={classes.iconPadding} />
                            <Typography color="primary" variant="h5">Convenient</Typography>
                          </Toolbar>
                          <Container>
                            <Typography color="primary" variant="h6">App is convenient</Typography>
                          </Container>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Toolbar>
                            <TimerIcon color="primary" className={classes.iconPadding} />
                            <Typography color="primary" variant="h5">Fast</Typography>
                          </Toolbar>
                          <Container>
                            <Typography color="primary" variant="h6">No slow downs</Typography>
                          </Container>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={`${classes.setBackground} ${classes.homeBackdrop1}`}>
                <Grid className={classes.gridHeight} alignItems="center" container>
                  <Grid item xs={12}>
                    <Paper className={classes.description}>
                      <Typography gutterBottom color="primary" variant="h4">Pricing plans</Typography>
                      <Grid container justify="space-evenly" spacing={4}>
                        <Grid item xs={12} sm={3}>
                          <Card className={classes.gridItem}>
                            <CardHeader title={
                              <Typography className={classes.bronzeFont} variant="h5">Bronze</Typography>
                      }
                            />
                            <CardContent>
                              <Typography className={classes.bronzeFont} variant="h6">Basic and free</Typography>
                            </CardContent>
                            <CardActions>
                              <Button className={classes.bronzeFont}>Signup</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Card className={classes.gridItem}>
                            <CardHeader title={
                              <Typography variant="h5">Silver</Typography>
                      }
                            />
                            <CardContent>
                              <Typography variant="h6">Premium but still free</Typography>
                            </CardContent>
                            <CardActions>
                              <Button>Signup</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Card className={classes.gridItem}>
                            <CardHeader title={
                              <Typography className={classes.goldFont} variant="h5">Gold</Typography>
                      }
                            />
                            <CardContent>
                              <Typography className={classes.goldFont} variant="h6">Even more premium but ... still free</Typography>
                            </CardContent>
                            <CardActions>
                              <Button className={classes.goldFont}>Signup</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Card className={classes.gridItem}>
                            <CardHeader title={
                              <Typography className={classes.platinumFont} variant="h5">Platinum</Typography>
                      }
                            />
                            <CardContent>
                              <Typography className={classes.platinumFont} variant="h6">Yep even more premium but still free</Typography>
                            </CardContent>
                            <CardActions>
                              <Button className={classes.platinumFont}>Signup</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                        <Grid />
                        <Grid />
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mt={5}>
            <Copyright yourWebsite="My Diary App Demo" />
          </Box>
        </Container>
      </AuthHeader>
    </>
  );
}
