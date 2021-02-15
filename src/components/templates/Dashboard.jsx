import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UserIcon from '@material-ui/icons/AccountCircleOutlined';
import SignoutIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import env from '../../utils/env';
import authServices from '../Auth';

const drawerWidth = 240;
const reqURL = env.backendAPI('auth/logout');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appTitle: {
    flexGrow: 1,
  },
}));

function Dashboard({
  window, children, homeSelect, profileSelect, fetchErr,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const history = useHistory();
  const auth = authServices.useAuth();

  const handleLogout = async () => {
    auth.logout(reqURL)
      .then(() => {
        history.push('/entries');
      }).catch((err) => { throw err; });
  };

  const clickHome = () => {
    history.push('/entries');
  };

  const clickProfile = () => {
    history.push('/profile');
  };

  const handleCompose = () => {
    history.push('/compose');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Toolbar>
          <Hidden className={classes.appTitle} implementation="css" smUp>
            <Typography variant="h6" align="center" noWrap>
              My Diary App Demo
            </Typography>
          </Hidden>
          <Hidden className={classes.appTitle} implementation="css" xsDown>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCompose}
            >
              Compose
            </Button>
          </Hidden>
        </Toolbar>
      </div>
      <Divider />
      <List>
        <ListItem button selected={homeSelect} onClick={clickHome} key="Home">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button selected={profileSelect} onClick={clickProfile} key="Profile">
          <ListItemIcon><UserIcon /></ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItem>
        <ListItem onClick={handleLogout} button key="Signout">
          <ListItemIcon><SignoutIcon /></ListItemIcon>
          <ListItemText primary="Signout" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.appTitle} variant="h6" align="center" noWrap>
            My Diary App Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography color="error">{fetchErr}</Typography>
        {children}
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
  homeSelect: PropTypes.bool,
  profileSelect: PropTypes.bool,
  fetchErr: PropTypes.string,
};

Dashboard.defaultProps = {
  window: undefined,
  homeSelect: false,
  profileSelect: false,
  fetchErr: '',
};

export default Dashboard;
