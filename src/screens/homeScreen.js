/*
 * @Author: Rider
 * @Date: 2020-02-05 15:27:46
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-11 22:22:38
 * @Description: file content
 */
import React from 'react';
import clsx from 'clsx';
import { Switch, Route, useRouteMatch, useHistory, Redirect } from 'react-router-dom';

import AdminUserPage from './adminUserPage';
import UserPage from './userPage';
import DrivePage from './drivePage';
import BusPage from './busPage';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';
import AirportShuttleOutlinedIcon from '@material-ui/icons/AirportShuttleOutlined';

import {getToken} from '../util/token';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function back() {
  if (getToken() === "null" || getToken() === false) {
    return <Redirect to='/login' />
  }
}

function Home() {
	const classes = useStyles();
	const theme = useTheme();
	
	const history = useHistory();
	let { path, url } = useRouteMatch();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      { back() }
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            班车预约后台
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
					<ListItem
						button
						onClick={() => history.push(`${url}/adminuser`)}
						>
						<ListItemIcon>
							<AccountCircleOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="管理员"/>
					</ListItem>

					<ListItem
						button
						onClick={() => history.push(`${url}/user`)}
						>
						<ListItemIcon>
							<FaceOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="普通用户"/>
					</ListItem>

					<ListItem
						button
						onClick={() => history.push(`${url}/driveuser`)}
						>
						<ListItemIcon>
							<AccessibleOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="司机"/>
					</ListItem>

        </List>
        <Divider />
				<List>
        <ListItem
          button
          onClick={() => history.push(`${url}/bus`)}
          >
						<ListItemIcon>
							<AirportShuttleOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="班车管理"/>
					</ListItem>
				</List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
				<div className={classes.drawerHeader} />
				<Switch>
					<Route path={`${path}/adminuser`}>
						<AdminUserPage />
					</Route>
					<Route path={`${path}/user`}>
						<UserPage />
					</Route>
					<Route path={`${path}/driveuser`}>
						<DrivePage />
					</Route>
          <Route path={`${path}/bus`}>
						<BusPage />
					</Route>
				</Switch>
      </main>
    </div>
  );
}

export default Home;