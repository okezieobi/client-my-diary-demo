import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

export default function Form({
  title, setTitle, body, setBody, formBtnState, reqErr, handleSubmit,
}) {
  const classes = useStyles();
  function handleTitleChange({ target: { value } }) { setTitle(value); }
  function handleBodyChange({ target: { value } }) { setBody(value); }

  return (
    <Paper className={classes.paper}>
      <form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography color="error">{reqErr}</Typography>
          </Grid>
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
              onChange={handleTitleChange}
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
              onChange={handleBodyChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={formBtnState}
            >
              {formBtnState ? 'Sending' : 'Submit'}
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
      </form>
    </Paper>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  setBody: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reqErr: PropTypes.string,
  formBtnState: PropTypes.bool.isRequired,
};

Form.defaultProps = {
  title: '',
  body: '',
  reqErr: '',
};
