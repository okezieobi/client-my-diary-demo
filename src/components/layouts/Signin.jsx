import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Root from './Root';
import SigninBG from '../../images/Signin.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    width: '100%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    backgroundImage: `url(${SigninBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100%',
    backgroundSize: 'cover',
  },
}));

export default function Signin({
  trackUsernameEmail, trackPassword, handleSubmit,
}) {
  const classes = useStyles();

  return (
    <div className={classes.backdrop}>
      <Root>
        <main>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email-username"
                label="Email Address / Username"
                name="email-username"
                autoComplete="email-username"
                autoFocus
                onChange={trackUsernameEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={trackPassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/password-reset" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Do not have an account yet ? Sign up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </main>
      </Root>
    </div>
  );
}

Signin.propTypes = {
  trackUsernameEmail: PropTypes.func,
  trackPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
};

Signin.defaultProps = {
  trackUsernameEmail: undefined,
  trackPassword: undefined,
  handleSubmit: undefined,
};
