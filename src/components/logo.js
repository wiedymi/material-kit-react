import React from 'react';
import {
  makeStyles, Avatar
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 100,
    height: 32
  }
}));

const Logo = (props) => {
  const classes = useStyles();

  return (
    <Avatar
      variant="square"
      className={classes.avatar}
      alt="Logo"
      src="/static/logo.png"
      {...props}
    />
  );
};

export default Logo;
