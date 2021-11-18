import React from 'react';
import {
  makeStyles, Avatar, Menu, MenuItem
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 32,
    height: 32
  }
}));

const UserAvatar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // eslint-disable-next-line react/prop-types,no-unused-vars
  const {
    user, removeToken
  } = props;

  return (
    <div>
      <Avatar
        onClick={handleClick}
        className={classes.avatar}
        alt="EI"
        src={(user !== null) ? user.avatar : 'EI'}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={removeToken}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

UserAvatar.propTypes = {
  user: PropTypes.object,
  removeToken: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeToken: () => dispatch({ type: 'REMOVE_TOKEN' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
