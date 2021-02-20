import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../templates/Dashboard';
import ProfileBG from '../../images/Home_1.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  backdrop: {
    backgroundImage: `url(${ProfileBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
  },
}));

export default function ProfileView({
  fullName, email, username, entries, createdAt, updatedAt,
}) {
  const classes = useStyles();

  return (
    <Dashboard profileSelect>
      <div className={classes.backdrop}>
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <Grid container justify="center" spacing={1}>
                <Grid item xs={4}>
                  <Avatar />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" gutterBottom>Full Name:</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" gutterBottom>{fullName}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" gutterBottom>Email</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" gutterBottom>{email}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" gutterBottom>Username</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" gutterBottom>{username}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" gutterBottom>Number of entries:</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" gutterBottom>{entries}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" gutterBottom>Created on:</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" gutterBottom>{createdAt}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" gutterBottom>Updated on:</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" gutterBottom>{updatedAt}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Dashboard>
  );
}

ProfileView.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  entries: PropTypes.number,
  updatedAt: PropTypes.string,
  createdAt: PropTypes.string,
};

ProfileView.defaultProps = {
  fullName: '',
  email: '',
  username: '',
  entries: 0,
  updatedAt: '',
  createdAt: '',
};
