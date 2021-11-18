import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux'
import {
  User as UserIcon,
  // Users as UsersIcon
} from 'react-feather';
import { CropFreeSharp, PhotoLibrary } from '@material-ui/icons';
import NavItem from './NavItem';
import { IoIosLogOut } from 'react-icons/io'

const items = [
  // {
  //   href: '/app/users',
  //   icon: UsersIcon,
  //   title: 'Users'
  // },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: '/app/designs',
  //   icon: UserIcon,
  //   title: 'Designs'
  // },
  {
    href: '/app/tattoos',
    icon: PhotoLibrary,
    title: 'Gallery'
  },
  {
    href: '/camera/scan',
    icon: CropFreeSharp,
    title: 'Scan'
  },
  {
    href: '/app/user/tattoos',
    icon: UserIcon,
    title: 'My Tattoos'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    margin: 0,
    padding: 0,
    backgroundColor: '#eee',
    fontFamily: 'Roboto',
    color: '#898989'
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  user: {
    backgroundColor: 'white', 
    padding: '10px', 
    borderRadius: '50%', 
    display: 'block', 
    marginBottom: '10px',
    boxShadow: '0 2px 10px 2px #ddd'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: 0,
    textTransform: 'none',
    width: '100%'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  }
}));

const NavBar = ({ onMobileClose, openMobile, user }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="row"
    >

      <Box p={2} paddingLeft={5} width="100%">
        <Box className={classes.flex}>
          <Box>
            <UserIcon className={classes.user} size={40}/>          
            {user && <Typography variant="body1" style={{fontSize: '14px'}}>{user.username}</Typography>}
          </Box>
          <Typography variant="body1">v1.0</Typography>
        </Box>
        <List style={{display: 'flex'}}>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <li className={classes.button} onClick={() => logout()}>
            <IoIosLogOut style={{display: 'block'}} size={24}/>
            <span style={{fontWeight: 'lighter', fontSize: '14px'}}>Logout</span>
          </li>
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="top"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  user: PropTypes.object
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
  user: null
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavBar);
