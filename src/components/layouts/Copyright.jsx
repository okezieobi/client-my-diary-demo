import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright({ yourWebsite }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {yourWebsite}
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

Copyright.propTypes = {
  yourWebsite: PropTypes.string,
};

Copyright.defaultProps = {
  yourWebsite: '',
};
