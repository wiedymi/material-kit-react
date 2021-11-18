import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import { AiOutlineMenu } from 'react-icons/ai'
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff'
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  toggleTheme,
}) => {
  const classes = useStyles();
  const [notifications] = useState([1]);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
    >
      <Toolbar style={{ paddingLeft: '5px', paddingTop: '5px' }}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <AiOutlineMenu size={30} color="#C0C0C0"/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  toggleTheme: PropTypes.func
};

export default TopBar;
