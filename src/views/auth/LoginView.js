import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Container, makeStyles, TextField, Typography, withStyles, InputBase, fade, InputLabel, FormControl
} from '@material-ui/core';
import Page from 'src/components/Page';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { baseUrl, baseHeaders } from '../../utils/config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  logo: {
    width: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  landing: {
    width: '100%',
    objectFit: 'cover'
  }
}));

const StyledButton = withStyles({
  root: {
    background: '#f7f7f7',
    borderRadius: 8,
    border: 0,
    color: '#000',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 2px 5px 2px #ddd',
    marginTop: 10
  },
  label: {
    textTransform: 'lowercase',
    fontSize: '22px'
  },
})(Button);

const StyledInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    width: '100%',
    height: 25,
    padding: '10px 12px',
    boxShadow: '0 2px 5px 2px #ddd',
  },
}))(InputBase);

const LoginView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  // eslint-disable-next-line react/prop-types
  const { isLoggedIn } = props;
  if (isLoggedIn !== null) {
    return (<Navigate to="/camera/scan"/>);
  }

  const authenticateUser = (token) => {
    fetch(`${baseUrl}/users/me/`, {
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          props.setUser(data);
        });
      }
    });
  }

  const loginUser = (values, actions) => {
    // const mobileNumber = values.mobile.substring(0, 3) === '+91' ? values.mobile : `+91${values.mobile}`
    // const newValues = {...values, mobile: mobileNumber}
    fetch(`${baseUrl}/api-token-auth/`, {
      method: 'POST',
      headers: {
        ...baseHeaders
      },
      body: JSON.stringify(values)
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          // eslint-disable-next-line react/prop-types
          authenticateUser(data.token);
          props.setToken(data.token);
          navigate('/loading', { replace: true });
        });
      } else {
        actions.setFieldError('username', 'Unable to login with given credentials');
        actions.setSubmitting(false);
      }
    }).catch(() => {
      actions.setFieldError('username', 'Unable to login with given credentials');
      actions.setSubmitting(false);
    });
  }

  // const sendOtp = (values, actions) => {
  //   const mobileNumber = values.mobile.substring(0, 3) === '+91' ? values.mobile : `+91${values.mobile}`
  //   const newValues = {...values, mobile: mobileNumber}
  //   fetch(`${baseUrl}/auth/mobile/`, {
  //     method: 'POST',
  //     headers: {
  //       ...baseHeaders
  //     },
  //     body: JSON.stringify(newValues)
  //   }).then((response) => {
  //     if (response.status === 200) {
  //       response.json().then((data) => {
  //         setOtpSent(true);
  //         actions.setSubmitting(false);
  //       });
  //     } else {
  //       actions.setFieldError('phone number', 'Unable to login with given credentials');
  //       actions.setSubmitting(false);
  //     }
  //   }).catch(() => {
  //     actions.setFieldError('phone number', 'Unable to login with given credentials');
  //     actions.setSubmitting(false);
  //   });
  // }

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
          <Box height="50%">
            <img src="/static/logo.jpg" className={classes.logo} alt="Logo"/>
          </Box>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            // validationSchema={Yup.object().shape({
            //   mobile: Yup.string().max(10).required('Phone number is required'),
            //   otp: Yup.string().max(6).required('OTP is required')
            // })}
            onSubmit={(values, actions) => loginUser(values, actions)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl style={{width: '100%', marginBottom: 15}}>
                  <InputLabel shrink htmlFor="username" style={{fontSize: '22px'}}>
                    username
                  </InputLabel>
                  <StyledInput
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    name="username"
                    id="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.username}
                  />
                </FormControl>
                <FormControl style={{width: '100%', marginBottom: 15}}>
                  <InputLabel shrink htmlFor="password" style={{fontSize: '22px'}}>
                    password
                  </InputLabel>
                  <StyledInput
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    name="password"
                    id="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"                  
                    value={values.password}
                  />
                </FormControl>
                <Box my={2}>
                  <StyledButton
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                  >
                    sign in
                  </StyledButton>
                </Box>
                <Typography variant="p" style={{textAlign: 'center', display: 'block', color: 'gray'}} onClick={() => navigate('/register', { replace: true })}>Create a new Account</Typography>
              </form>
            )}
          </Formik>
        </Container>
        {/* {otpSent
        ? <Container maxWidth="sm">
          <Box height="50%">
            <img src="/static/logo.jpg" className={classes.logo} alt="Logo"/>
          </Box>
          <Formik
            initialValues={{
              mobile: '',
              token: ''
            }}
            // validationSchema={Yup.object().shape({
            //   mobile: Yup.string().max(10).required('Phone number is required'),
            //   otp: Yup.string().max(6).required('OTP is required')
            // })}
            onSubmit={(values, actions) => loginUser(values, actions)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl style={{width: '100%', marginBottom: 15}}>
                  <InputLabel shrink htmlFor="mobile" style={{fontSize: '22px'}}>
                    phone number
                  </InputLabel>
                  <StyledInput
                    error={Boolean(touched.mobile && errors.mobile)}
                    fullWidth
                    name="mobile"
                    id="mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.mobile}
                  />
                </FormControl>
                <FormControl style={{width: '100%', marginBottom: 15}}>
                  <InputLabel shrink htmlFor="token" style={{fontSize: '22px'}}>
                    otp
                  </InputLabel>
                  <StyledInput
                    error={Boolean(touched.otp && errors.otp)}
                    fullWidth
                    name="token"
                    id="token"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"                  
                    value={values.token}
                  />
                </FormControl>
                <Box my={2}>
                  <StyledButton
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                  >
                    sign in
                  </StyledButton>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
        : <Container maxWidth="sm">
          <Box height="50%">
            <img src="/static/logo.jpg" className={classes.logo} alt="Logo"/>
          </Box>
          <Formik
            initialValues={{
              mobile: '',
              otp: ''
            }}
            // validationSchema={Yup.object().shape({
            //   phone: Yup.number().max(10).required('Phone number is required')
            // })}
            onSubmit={(values, actions) => sendOtp(values, actions)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl style={{width: '100%', marginBottom: 15}}>
                  <InputLabel shrink htmlFor="mobile" style={{fontSize: '22px'}}>
                    phone number
                  </InputLabel>
                  <StyledInput
                    error={Boolean(touched.mobile && errors.mobile)}
                    fullWidth
                    name="mobile"
                    id="mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.mobile}
                  />
                </FormControl>
                <FormControl style={{width: '100%', marginBottom: 15}}>
                  <InputLabel shrink htmlFor="otp" style={{fontSize: '22px'}}>
                    otp
                  </InputLabel>
                  <StyledInput
                    error={Boolean(touched.otp && errors.otp)}
                    fullWidth
                    name="otp"
                    id="otp"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"                  
                    value={values.otp}
                    disabled
                  />
                </FormControl>
                <Box my={2}>
                  <StyledButton
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                  >
                    send otp
                  </StyledButton>
                </Box>
              </form>
            )}
          </Formik>
        </Container>} */}
        <Box style={{marginTop: '50px'}}>
          <img src="/static/landing.png" className={classes.landing} alt="Landing"/>
        </Box>
      </Box>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch({ type: 'SET_TOKEN', token }),
    setUser: (user) => dispatch({ type: 'SET_USER', user })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
