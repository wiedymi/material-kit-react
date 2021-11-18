import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  withStyles,
  InputBase,
  FormControl,
  InputLabel
} from '@material-ui/core';
import Page from 'src/components/Page';
import { connect } from 'react-redux';
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

const RegisterView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const registerUser = (values, actions) => {
    fetch(`${baseUrl}/register/`, {
      method: 'POST',
      headers: {
        ...baseHeaders
      },
      body: JSON.stringify(values)
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          // eslint-disable-next-line react/prop-types
          navigate('/login', { replace: true });
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
      <Container maxWidth="sm" style={{paddingTop: '50px'}}>
          <Box height="35%">
            <img src="/static/logo.jpg" className={classes.logo} alt="Logo"/>
          </Box>
          <Formik
            initialValues={{
              username: '',
              email: '',
              mobile: '',
              password: ''
            }}
            // validationSchema={Yup.object().shape({
            //   mobile: Yup.string().max(10).required('Phone number is required'),
            //   otp: Yup.string().max(6).required('OTP is required')
            // })}
            onSubmit={(values, actions) => registerUser(values, actions)}
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
                  <InputLabel shrink htmlFor="email" style={{fontSize: '22px'}}>
                    email
                  </InputLabel>
                  <StyledInput
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    name="email"
                    id="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.email}
                  />
                </FormControl>
                <FormControl style={{width: '100%', marginBottom: 15}}>
                  <InputLabel shrink htmlFor="mobile" style={{fontSize: '22px'}}>
                    mobile
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
                <Typography variant="p" style={{textAlign: 'center', display: 'block', color: 'gray'}} onClick={() => navigate('/login', { replace: true })}>Already have an account? Sign In</Typography>
                <Box my={2}>
                  <StyledButton
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                  >
                    register
                  </StyledButton>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
        <Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
