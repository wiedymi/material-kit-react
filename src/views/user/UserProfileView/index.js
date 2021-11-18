import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar, Box,
  Card, CardContent, Divider, Grid, makeStyles, Typography
} from '@material-ui/core';
import Page from '../../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  Item: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    width: 64,
    height: 64,
  }
}));

const UserProfile = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Page
      className={clsx(classes.root, className)}
      {...rest}
      title="User"
    >
      <Card className={classes.Item}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            mb={3}
          >
            <Avatar ml={3} className={classes.avatar} src="/static/images/avatars/yaktocat.png" />
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography variant="h4">Abhishek Kulkarni</Typography>
          </Box>
          <Box display="flex" justifyContent="center" mb={3}>
            <Typography variant="h6">@theredcomet</Typography>
          </Box>
          <Divider />
          <Grid>
            <Box mt={3}>
              <Typography variant="h4">Abhishek Kulkarni</Typography>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Page>
  );
};

UserProfile.propTypes = {
  className: PropTypes.string,
};

export default UserProfile;
