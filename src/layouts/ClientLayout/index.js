import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import NavBar from './NavBar';
import TopBar from './TopBar';

const ClientLayout = (props) => {
  const classes = useStyles();
  // const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [setMobileNavOpen] = useState(false);
  // eslint-disable-next-line react/prop-types
  const {
    toggleTheme
  } = props;

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} toggleTheme={toggleTheme} />
      {/* <NavBar */}
      {/*  onMobileClose={() => setMobileNavOpen(false)} */}
      {/*  openMobile={isMobileNavOpen} */}
      {/* /> */}
      <div className={classes.content}>
        <Outlet />
      </div>
      {/* <div className={classes.wrapper}> */}
      {/*  <div className={classes.contentContainer}> */}
      {/*    <div className={classes.content}> */}
      {/*      <Outlet /> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
    </div>
  );
};

ClientLayout.propTypes = {
  toggleTheme: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
  };
};

export default connect(null, mapDispatchToProps)(ClientLayout);
