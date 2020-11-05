import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import AuthHeader from './Auth';
import Copyright from './Copyright';
import SignupBG from '../../images/Signup.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    backgroundImage: `url(${SignupBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
  },
}));

export default function Signup({
  setFname, setUsername,
  setEmail, setPassword, handleSubmit,
  formBtnState, signupErr,
}) {
  const classes = useStyles();

  return (
    <div className={classes.backdrop}>
      <AuthHeader>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="fullName"
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                    onChange={({ target: { value } }) => setFname(value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={({ target: { value } }) => setUsername(value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={({ target: { value } }) => setEmail(value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={({ target: { value } }) => setPassword(value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={formBtnState}
              >
                {formBtnState ? 'Sending ...' : 'Submit'}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item>
                  <Typography color="secondary">{signupErr}</Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Box mt={5}>
            <Copyright yourWebsite="My Diary App Demo" />
          </Box>
        </Container>
      </AuthHeader>
    </div>
  );
}

Signup.propTypes = {
  setFname: PropTypes.func,
  setUsername: PropTypes.func,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  formBtnState: PropTypes.bool,
  signupErr: PropTypes.string,
};

Signup.defaultProps = {
  setFname: undefined,
  setUsername: undefined,
  setEmail: undefined,
  setPassword: undefined,
  handleSubmit: undefined,
  formBtnState: false,
  signupErr: undefined,
};
