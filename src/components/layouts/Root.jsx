import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Main from './Main';

function Copyright() {
  return (
    <Typography align="center" variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        My Diary
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  main: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: theme.spacing(2, 1),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter({
  window, children, headerLink, href,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Main window={window} headerLink={headerLink} href={href}>
          {children}
        </Main>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

StickyFooter.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
  headerLink: PropTypes.string,
  href: PropTypes.string,
};

StickyFooter.defaultProps = {
  window: undefined,
  headerLink: '',
  href: '/',
};
