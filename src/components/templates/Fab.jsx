import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(3),
    },
  },
}));

export default function FloatingActionButtons({ handleClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab onClick={handleClick} color="primary">
        <EditIcon />
      </Fab>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  handleClick: PropTypes.func,
};

FloatingActionButtons.defaultProps = {
  handleClick: undefined,
};
