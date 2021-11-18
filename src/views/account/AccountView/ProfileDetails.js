import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Formik } from 'formik';
import { baseUrl, baseHeaders } from '../../../utils/config';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = (props) => {
  const classes = useStyles();
  const { user, token } = props;

  return (
    <Formik
      className={classes.root}
      initialValues={user}
      onSubmit={(values, actions) => {
        fetch(`${baseUrl}/users/${user.id}/`, {
          method: 'PATCH',
          headers: {
            ...baseHeaders,
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(values)
        }).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              // eslint-disable-next-line react/prop-types
              props.setUser(data);
              actions.setSubmitting(false);
            });
          } else {
            response.json().then((data) => {
              Object.keys(data).forEach((key) => {
                if (key !== 'non_field_errors') {
                  actions.setFieldError(key, data[key].join());
                } else {
                  actions.setFieldError('first_name', 'Unable to update details');
                }
              });
            });
            actions.setSubmitting(false);
          }
        }).catch(() => {
          actions.setFieldError('first_name', 'Unable to update details');
          actions.setSubmitting(false);
        });
      }}
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
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText={touched.first_name && errors.first_name}
                    label="First name"
                    name="first_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.first_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText={touched.last_name && errors.last_name}
                    label="Last name"
                    name="last_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.last_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              p={2}
            >
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ProfileDetails.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func
};

export default ProfileDetails;
