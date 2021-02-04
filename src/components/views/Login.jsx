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

import Root from '../templates/Root';
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

export default function Login({
  setUser, setPassword, handleSubmit, loginErr, formBtnState,
  userErr, errInUser, passwordErr, errInPassword,
}) {
  const classes = useStyles();
  function handleUserChange({ target: { value } }) { setUser(value); }
  function handlePasswordChange({ target: { value } }) { setPassword(value); }

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
                label="Email Address or Username"
                name="email-username"
                autoComplete="email-username"
                autoFocus
                onChange={handleUserChange}
                error={errInUser}
                helperText={userErr}
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
                onChange={handlePasswordChange}
                error={errInPassword}
                helperText={passwordErr}
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
                disabled={formBtnState}
              >
                {formBtnState ? 'Sending ...' : 'Submit'}
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
              <Grid container justify="center">
                <Grid item>
                  <Typography color="error">{loginErr}</Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </main>
      </Root>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loginErr: PropTypes.string.isRequired,
  formBtnState: PropTypes.bool.isRequired,
  userErr: PropTypes.string.isRequired,
  errInUser: PropTypes.bool.isRequired,
  passwordErr: PropTypes.string.isRequired,
  errInPassword: PropTypes.bool.isRequired,
};
