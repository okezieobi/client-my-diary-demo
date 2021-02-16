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

export default function Form({
  title, setTitle, body, setBody,
  formBtnState, handleSubmit, titleErr, bodyErr,
  errInTitle, errInBody,
}) {
  const classes = useStyles();
  function handleTitleChange({ target: { value } }) { setTitle(value); }
  function handleBodyChange({ target: { value } }) { setBody(value); }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              error={errInTitle}
              helperText={titleErr}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="entry-title"
              label="Title"
              name="entry-title"
              autoComplete="entry-title"
              defaultValue={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              error={errInBody}
              helperText={bodyErr}
              margin="normal"
              required
              fullWidth
              id="entry-body"
              label="Body"
              name="entry-body"
              autoComplete="entry-body"
              autoFocus
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
              disabled={formBtnState}
              type="submit"
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
  titleErr: PropTypes.string,
  errInTitle: PropTypes.bool,
  body: PropTypes.string,
  bodyErr: PropTypes.string,
  errInBody: PropTypes.bool,
  setBody: PropTypes.func,
  setTitle: PropTypes.func,
  handleSubmit: PropTypes.func,
  formBtnState: PropTypes.bool,
};

Form.defaultProps = {
  title: '',
  titleErr: '',
  errInTitle: false,
  errInBody: false,
  body: '',
  bodyErr: '',
  setBody: undefined,
  setTitle: undefined,
  handleSubmit: undefined,
  formBtnState: false,
};
