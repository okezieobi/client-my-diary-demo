import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../layouts/Dashboard';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

export default function () {
  const history = useHistory();
  const classes = useStyles();
  const rowData = JSON.parse(localStorage.getItem('clickedRow'));

  const handleEditClick = () => {
    history.push('/edit');
  };

  return (
    <Dashboard homeSelect>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Title:
              <br />
              {rowData ? rowData[0] : ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Body:
              <br />
              {rowData ? rowData[1] : ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Created On:
              <br />
              {rowData ? rowData[2] : ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Updated On:
              <br />
              {rowData ? rowData[3] : ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Dashboard>
  );
}
