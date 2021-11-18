import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  makeStyles
} from '@material-ui/core';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    padding: 0,
    margin: 0
  },
  cardImage: {
    width: '100%'
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '400',
    marginTop: '10px',
    textTransform: 'capitalize',
    color: '#898989'
  },
  ImageContainer: {
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

const TattooCard = ({ tattoo, height, design=false }) => {
  const classes = useStyles();

  return (
    <Link to={`/app/tattoo/${tattoo.id}?design=${design}`}>
      <div className={classes.ImageContainer} style={{height: `${height}px`}}>
        {tattoo.image ? 
        <img src={tattoo.image} alt="Image" style={{width: '100%', maxHeight: `${height-50}px`}}/>
        : <img src={`/static/placeholder-1.png`} alt="Image" style={{width: '70%', maxHeight: `${height-50}px`}}/>}
      </div>
      <h4 className={classes.cardTitle}>{tattoo.name}</h4>
    </Link>
  );
};

TattooCard.propTypes = {
  tattoo: PropTypes.object.isRequired,
  token: PropTypes.string,
};

export default TattooCard;
    // <Card className={classes.cardWrapper} raised="true">
    //   <Grid container className={classes.gridWrapper}>
    //     <Grid item xs={6}>
    //       <Box className={classes.gridItemsWrapper}>
    //         <Avatar
    //           className={classes.avatar}
    //           src={tattoo.image}
    //           variant="rounded"
    //         />
    //       </Box>
    //     </Grid>
    //     <Divider className={classes.divider} orientation="vertical" flexItem />
    //     <Grid item xs={5} align="center">
    //       <Box className={classes.gridItemsWrapper}>
    //         {!tattoo.audio ? (
    //           <AddAudioButtonComponent tattooId={tattoo.id} setTattoosList={setTattoosList} token={token} />
    //         ) : (
    //           <UploadAudioButtonComponent tattoo={tattoo} setTattoosList={setTattoosList} token={token}/>
    //         )}
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Card>