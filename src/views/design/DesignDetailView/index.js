import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar, Box,
  Card, CardContent, Divider, GridList, GridListTile, makeStyles, Typography
} from '@material-ui/core';
import Page from '../../../components/Page';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  Item: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    width: 64,
    height: 64,
  }
}));

function getProduct() {
  // eslint-disable-next-line radix
  const productID = parseInt(window.location.pathname.split('/')[3]);
  let selectedProduct = null;
  data.forEach((item) => {
    if (item.id === productID) {
      selectedProduct = item;
    }
  });
  return selectedProduct;
}
const DesignDetail = ({ className, ...rest }) => {
  const classes = useStyles();
  const product = getProduct();

  return (
    <Page
      className={clsx(classes.root, className)}
      {...rest}
      title="Design"
    >
      <Card className={classes.Item}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            mb={3}
          >
            <Avatar ml={3} className={classes.avatar} src={product.image} />
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography variant="h4">{product.name}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" mb={3}>
            <Typography variant="h6">{product.is_trained}</Typography>
          </Box>
          <Divider />
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {product.images.map((tile) => (
              <GridListTile key={tile} cols={1}>
                <img src={tile} alt={tile} />
              </GridListTile>
            ))}
          </GridList>
        </CardContent>
      </Card>
    </Page>
  );
};

DesignDetail.propTypes = {
  className: PropTypes.string
};

export default DesignDetail;
