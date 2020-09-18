import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import BookIcon from '@material-ui/icons/BookOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  iconTitle: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexGrow: '1',
    },
  },
  title: {
    flexGrow: '1',
  },
}));

function ElevationScroll({ children, window }) {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 8 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Home({
  window, children, headerLink, href,
}) {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <ElevationScroll window={window}>
        <Slide in>
          <AppBar>
            <Toolbar>
              <Box className={classes.iconTitle}>
                <BookIcon />
              </Box>
              <Hidden className={classes.title} implementation="css" xsDown>
                <Typography variant="h6">MyDiary</Typography>
              </Hidden>
              <Link underline="none" href={href} color="inherit">
                <Typography variant="h6">{headerLink}</Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </Slide>
      </ElevationScroll>
      <Toolbar />
      {children}
    </>
  );
}

Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
  headerLink: PropTypes.string,
  href: PropTypes.string,
};

Home.defaultProps = {
  window: undefined,
  headerLink: '',
  href: '/',
};
