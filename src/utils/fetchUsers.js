import { connect } from 'react-redux';
import { baseUrl, baseHeaders } from './config';

const fetchUserProfile = (props) => {
  const { token, setUsersList } = props;
  fetch(`${baseUrl}/api/v1/users/`, {
    headers: {
      ...baseHeaders,
      Authorization: `token ${token}`
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsersList: (usersList) => dispatch({ type: 'SET_USERS_LIST', usersList })
  };
};

export default connect(null, mapDispatchToProps)(fetchUserProfile);
