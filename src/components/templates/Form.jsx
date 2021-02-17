import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
  entry, setTitle, setBody,
  formBtnState, handleSubmit, titleErr, bodyErr,
  errInTitle, errInBody,
}) {
  const classes = useStyles();
  const history = useHistory();
  function handleTitleChange({ target: { value } }) { setTitle(value); }
  function handleBodyChange({ target: { value } }) { setBody(value); }
  const handleGoBack = () => {
    history.goBack();
  };

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
              defaultValue={entry.title}
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
              multiline
              autoFocus
              rows={12}
              defaultValue={entry.body}
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
              onClick={handleGoBack}
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
  entry: PropTypes.objectOf,
  titleErr: PropTypes.string,
  errInTitle: PropTypes.bool,
  bodyErr: PropTypes.string,
  errInBody: PropTypes.bool,
  setBody: PropTypes.func,
  setTitle: PropTypes.func,
  handleSubmit: PropTypes.func,
  formBtnState: PropTypes.bool,
};

Form.defaultProps = {
  entry: {},
  titleErr: '',
  errInTitle: false,
  errInBody: false,
  bodyErr: '',
  setBody: undefined,
  setTitle: undefined,
  handleSubmit: undefined,
  formBtnState: false,
};
