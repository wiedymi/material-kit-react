import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar, Box, Card, Chip, CardContent, Grid, makeStyles, Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    width: 64,
    height: 64
  }
}));

const DesignCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Link to={`/app/design/${product.id}`}>

      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item>
              <Avatar className={classes.avatar} alt="D" src={product.image} variant="rounded">D</Avatar>
            </Grid>
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {product.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box flexGrow={1} />
        <Box p={2}>
          <Grid
            container
            justify="space-between"
            spacing={2}
          >
            <Grid
              className={classes.statsItem}
              item
            >
              <Chip color="primary" label="Active" />
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >

                Created at
                {' '}
                {product.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Link>

  );
};

DesignCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default DesignCard;
