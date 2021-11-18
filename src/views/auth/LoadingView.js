import React from 'react';
import {
  Box, Container, makeStyles, Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { baseUrl, baseHeaders } from '../../utils/config';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoadingView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    isLoggedIn, user, setUser, element
  } = props;
  console.log(isLoggedIn, user, element);
  if (isLoggedIn !== null && user) {
    return (<Navigate to="/camera/scan" />);
  }

  if (isLoggedIn && user === null) {
    fetch(`${baseUrl}/users/me/`, {
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${isLoggedIn}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setUser(data);
        });
      }
    });
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Loading...
            </Typography>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

LoadingView.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  setUser: PropTypes.func,
  element: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: 'SET_USER', user })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);
