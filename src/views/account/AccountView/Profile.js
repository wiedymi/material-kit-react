import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = (props, { className, ...rest }) => {
  const classes = useStyles();
  const { user } = props;
  const fullName = () => {
    let name = user.first_name;
    if (user.last_name !== null) {
      name = `${name} ${user.last_name}`;
    }
    return name;
  };

  const getAvatar = () => {
    if (user) {
      if (user.avatar) {
        return user.avatar;
      }
      return 'EI';
    } return 'EI';
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            alt="EI"
            src={getAvatar()}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {fullName()}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            @
            {user.username}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="avatar-file"
            type="file"
          />
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default Profile;
