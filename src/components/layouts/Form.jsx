import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

export default function Form({ title, body }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="entry-title"
            label="Title"
            name="entry-title"
            autoComplete="entry-title"
            autoFocus
            defaultValue={title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="entry-body"
            label="Body"
            name="entry-body"
            autoComplete="entry-body"
            multiline
            rows={12}
            defaultValue={body}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
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
  );
}

Form.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

Form.defaultProps = {
  title: '',
  body: '',
};
