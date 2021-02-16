import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../templates/Dashboard';
import Switch from '../templates/Switch';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

export default function ProfileView() {
  const classes = useStyles();

  return (
    <Dashboard profileSelect>
      <Paper className={classes.paper}>
        <Grid justify="center" container spacing={4}>
          <Grid item xs={3}>
            <Avatar />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Full Name:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Email</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Username</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Number of entries:</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h6" gutterBottom>Created on:</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h6" gutterBottom>Updated on:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Typography variant="h6" gutterBottom>Set reminder</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Switch />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dashboard>
  );
}
