import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar, Box, Card, Chip, CardContent, Grid, makeStyles, Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    width: 64,
    height: 64
  }
}));

const UserCard = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const fullName = () => {
    let name = '';
    if (user.first_name) {
      name += user.first_name;
    }
    if (user.last_name) {
      name += ` ${user.last_name}`;
    }
    return name;
  };
  return (
    <Link to={`/app/user/${user.id}`}>

      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item>
              <Avatar className={classes.avatar} alt={user.initial} src={user.avatar} variant="rounded">{user.initial}</Avatar>
            </Grid>
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                @
                {' '}
                { user.username }
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {fullName()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box flexGrow={1} />
        <Box p={2}>
          <Grid
            container
            justify="space-between"
            spacing={2}
          >
            <Grid
              className={classes.statsItem}
              item
            >
              {user.groups.map((item) => (
                <Chip color="primary" label={item.name} />
              ))}
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >

                Created at
                {' '}
                {user.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Link>

  );
};

UserCard.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default UserCard;
