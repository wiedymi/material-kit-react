import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import UserCard from './UserCard';
import { baseHeaders, baseUrl } from '../../../utils/config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  ItemCard: {
    height: '100%'
  }
}));

const UserList = (props) => {
  const classes = useStyles();
  const { usersList, token, setUsersList } = props;
  if (usersList.results.length === 0) {
    fetch(`${baseUrl}/users/`, {
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setUsersList(data);
        });
      } else {
      // do something
      }
    }).catch(() => {
    // do something
    });
  }

  const pages = () => {
    let pages_ = 1;
    if (usersList.count > 0) {
      pages_ = usersList.count / 10;
      if (pages_ > parseInt(pages_, 10)) {
        pages_ += parseInt(pages_, 10) + 1;
      }
    }
    return parseInt(pages_, 10);
  };
  return (
    <Page
      className={classes.root}
      title="Users"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {usersList.results.map((user) => (
              <Grid
                item
                key={user.id}
                lg={3}
                md={6}
                xs={12}
              >
                <UserCard
                  className={classes.ItemCard}
                  user={user}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={pages()}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

UserList.propTypes = {
  usersList: PropTypes.object,
  token: PropTypes.string,
  setUsersList: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    usersList: state.usersList,
    token: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsersList: (usersList) => dispatch({ type: 'SET_USERS_LIST', usersList })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
