import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isLoggedIn, user, element } = props;
  if (isLoggedIn && user) {
    return (element);
  }
  if (isLoggedIn) {
    return <Navigate to="/loading" element={element} />;
  }
  return <Navigate to="/login" />;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
