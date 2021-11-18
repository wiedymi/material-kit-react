import React from 'react';
import clsx from 'clsx';
import {
  Box, Button,
  Card,
  CardContent, Divider,
  Grid,
  GridList,
  GridListTile, GridListTileBar, IconButton,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import * as PropTypes from 'prop-types';
import Page from '../../../components/Page';
import { baseHeaders, baseUrl } from '../../../utils/config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  form: {
    marginTop: theme.spacing(4)
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  imageGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  gridList: {
    minHeight: theme.spacing(10),
    border: `1px solid ${theme.palette.borderColor}`
  },
  Item: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
  },
  input: {
    display: 'none'
  }
}));

const DesignForm = (props, { className, ...rest }) => {
  const classes = useStyles();
  const { token } = props;

  function fileToDataURL(file) {
    const reader = new FileReader();
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  function getDataURLs(target) {
    return Promise.all([...target.files].map(fileToDataURL));
  }

  return (
    <Page
      className={clsx(classes.root, className)}
      {...rest}
      title="Add Design"
    >
      <Card className={classes.Item}>
        <CardContent>
          <Box display="flex" justifyContent="start">
            <Typography variant="h4">Add Design</Typography>
          </Box>
          <Formik
            initialValues={{
              name: '',
              images: [],
            }}
            onSubmit={(values, actions) => {
              fetch(`${baseUrl}/designs/`, {
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
                        actions.setFieldError('name', 'Unable create design');
                      }
                    });
                  });
                  actions.setSubmitting(false);
                }
              }).catch(() => {
                actions.setFieldError('name', 'Unable create design');
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
              values,
              setFieldValue
            }) => (
              <form
                className={classes.form}
                onSubmit={handleSubmit}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Design Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Box display="flex" justifyContent="start" className={classes.imageGrid}>
                  <Typography variant="h6">Training Images</Typography>
                </Box>
                <GridList className={classes.gridList} cols={8}>
                  {values.images.map((tile, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <GridListTile key={index}>
                      <img src={tile} alt={index} className={classes.image} />
                      <GridListTileBar
                        actionIcon={(
                          // eslint-disable-next-line no-shadow
                          <IconButton
                            id={index}
                            aria-label={`star ${index}`}
                            onClick={(e) => {
                              values.images.splice(parseInt(e.currentTarget.id, 10), 1);
                              setFieldValue('images', values.images);
                            }}
                          >
                            <DeleteIcon color="primary" />
                          </IconButton>
                        )}
                      />
                    </GridListTile>
                  ))}
                </GridList>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  name="images"
                  onChange={(event) => getDataURLs(event.target).then((result) => {
                    const newImages = result;
                    newImages.map((i) => values.images.push(i));
                    setFieldValue('images', values.images);
                  })}
                  multiple
                  type="file"
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
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
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Page>
  );
};

DesignForm.propTypes = {
  className: PropTypes.string,
  token: PropTypes.string
};

export default DesignForm;
