import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../templates/Dashboard';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

export default function Content({
  title, body, createdOn, updatedAt, reqErr,
}) {
  const history = useHistory();
  const classes = useStyles();

  const handleEditClick = () => {
    history.push('/edit');
  };

  return (
    <Dashboard homeSelect>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography color="error" gutterBottom>
              {reqErr}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Title:
              <br />
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Body:
              <br />
              {body}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Created On:
              <br />
              {createdOn}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Updated On:
              <br />
              {updatedAt}
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

Content.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  createdOn: PropTypes.string,
  updatedAt: PropTypes.string,
  reqErr: PropTypes.string,
};

Content.defaultProps = {
  title: '',
  body: '',
  createdOn: '',
  updatedAt: '',
  reqErr: '',
};
