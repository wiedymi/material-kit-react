import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = (props) => {
  const classes = useStyles();
  const { user, token, setUser } = props;
  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile user={user} token={token} setUser={setUser} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails user={user} token={token} setUser={setUser} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

Account.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    token: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: 'SET_USER', user })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
