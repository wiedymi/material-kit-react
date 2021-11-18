import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    fontFamily: 'Roboto'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    marginTop: '15%',
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  // eslint-disable-next-line react/prop-types
  const {
    toggleTheme
  } = props;

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} toggleTheme={toggleTheme} />
      <NavBar
      onMobileClose={() => setMobileNavOpen(false)}
      openMobile={isMobileNavOpen}
      />
      <div className={classes.content} id="content">
        <Outlet />
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  toggleTheme: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
  };
};

export default connect(null, mapDispatchToProps)(DashboardLayout);
