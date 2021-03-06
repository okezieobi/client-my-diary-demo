import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import Root from '../templates/Root';
import SignupBG from '../../images/Signup.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
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
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
}));

export default function Signup({
  setFullName, setUsername,
  setEmail, setPassword, handleSubmit,
  formBtnState, signupErr, fullNameErr,
  usernameErr, emailErr, passwordErr,
  errInFullName, errInUsername, errInEmail, errInPassword,
}) {
  const classes = useStyles();
  function handleFullNameChange({ target: { value } }) { setFullName(value); }
  function handleUsernameChange({ target: { value } }) { setUsername(value); }
  function handleEmailChange({ target: { value } }) { setEmail(value); }
  function handlePasswordChange({ target: { value } }) { setPassword(value); }

  return (
    <div className={classes.backdrop}>
      <Root>
        <main>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={errInFullName}
                    helperText={fullNameErr}
                    autoComplete="fname"
                    name="fullName"
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                    onChange={handleFullNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errInUsername}
                    helperText={usernameErr}
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={handleUsernameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errInEmail}
                    helperText={emailErr}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errInPassword}
                    helperText={passwordErr}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={formBtnState}
              >
                {formBtnState ? 'Sending ...' : 'Submit'}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account ? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item>
                  <Typography color="error">{signupErr}</Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </main>
      </Root>
    </div>
  );
}

Signup.propTypes = {
  setFullName: PropTypes.func.isRequired,
  errInFullName: PropTypes.bool.isRequired,
  fullNameErr: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  errInUsername: PropTypes.bool.isRequired,
  usernameErr: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  errInEmail: PropTypes.bool.isRequired,
  emailErr: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  errInPassword: PropTypes.bool.isRequired,
  passwordErr: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formBtnState: PropTypes.bool.isRequired,
  signupErr: PropTypes.string.isRequired,
};
