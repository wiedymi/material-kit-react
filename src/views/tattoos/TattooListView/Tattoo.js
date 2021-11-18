import React, { useState, useEffect } from 'react'
import {
    makeStyles
  } from '@material-ui/core';
import { Fragment } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import queryString from 'query-string';
import { FaShare } from 'react-icons/fa';
import Page from 'src/components/Page';
import { WhatsappShareButton } from 'react-share';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import { baseHeaders, baseUrl } from '../../../utils/config';
import { render } from 'nprogress';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    audioCard: {
      backgroundColor: '#fff',
      padding: '10px 4px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingBlock: '50px',
      position: 'relative',
      overflow: 'auto'
    },
    shareButton: {
        position: 'absolute',
        right: '20px',
        top: '20px',
        color: '#000'
    },
    audioIcon: {
      textAlign: 'center' 
    },
    audioButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '70px'
    },
    audioButton: {
      width: '100%',
      padding: '7px 13px',
      border: 'none',
      borderRadius: 0,
      fontSize: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px 2px #ddd',
      zIndex: 999,
      marginInline: '10px',
      textAlign: 'center'
    },
    imageContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      objectFit: 'contain',
      width: '50vw'
    }
  }));
  

export default function Tattoo() {
    const classes = useStyles();
    const [tattoo, setTattoo] = useState(null)
    let { id } = useParams();
    const { search } = useLocation();
    const values = queryString.parse(search);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(values.design === "true") {
            fetch(`${baseUrl}/designs/${id}/`, {
              headers: {
                ...baseHeaders,
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                response.json().then((data) => {
                  setTattoo(data);
                  setLoading(false);
                });
              } else {
              // do something
              }
          }).catch(() => {
            // do something
          });
        } else {
          fetch(`${baseUrl}/tattoo/${id}/`, {
            headers: {
              ...baseHeaders,
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setTattoo(data);
                setLoading(false);
              });
            } else {
            // do something
            }
        }).catch(() => {
          // do something
        });
        }
    }, [])

    const handleDelete = () => {
      const req = { audio: null }
      fetch(`${baseUrl}/tattoo/${tattoo.id}/`, {
        method: 'PATCH',
        headers: {
          ...baseHeaders,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(req)
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            navigate('/app/user/tattoos')
          });
        } else {
          // do something
        }
      }).catch(() => {
        // do something
      });
    }

    return (
      <Page
        className={classes.root}
        title="Designs"
      >
        <div className={classes.audioCard}>
            {!loading && (
              <div>
                {values.design === 'true'
                ? <Fragment>
                    <div className={classes.imageContainer}>
                    {tattoo.image ?
                      <img className={classes.image} src={tattoo.image} alt="Image" style={{ maxHeight: '210px' }}/>
                      : <img src={`/static/placeholder-1.png`} alt="Image" style={{ maxHeight: '210px' }}/>}
                      <h4 style={{marginTop: '20px'}}>{tattoo.name}</h4>
                    </div>
                    <div className={classes.audioIcon}>
                        <GraphicEqIcon/>
                        <h4>Audio</h4>
                    </div>
                    {!tattoo.audio
                    ? <div className={classes.audioButtons}>
                        <Link className={classes.audioButton} to={`/audio/${tattoo.id}/record?design=true`}>Record</Link>
                        <Link className={classes.audioButton} to={`/audio/${tattoo.id}/upload?design=true`}>Upload</Link>
                        </div>
                    : <div className={classes.audioButtons}>
                        <Link className={classes.audioButton} to={`/audio/${tattoo.id}/play`}>Play</Link>
                        <button className={classes.audioButton} onClick={() => handleDelete(tattoo.id)}>Remove</button>
                        </div>}
                </Fragment>
              : <Fragment>
                    <div className={classes.imageContainer}>
                    {tattoo.image ?
                      <img className={classes.image} src={tattoo.image} alt="Image" style={{ maxHeight: '210px' }}/>
                      : <img src={`/static/placeholder-1.png`} alt="Image" style={{ maxHeight: '210px' }}/>}
                      <h4 style={{marginTop: '20px'}}>{tattoo.name}</h4>
                    </div>
                    <div className={classes.shareButton}>
                        <WhatsappShareButton
                            url={`${window.location.host}/camera/scan?share_id=${tattoo.share_id}`}
                            quote={"ExpressInk - Search a tattoo here"}
                            style={{outline: 'none'}}>
                            <FaShare size={22}/>
                        </WhatsappShareButton>
                    </div>
                    <div className={classes.audioIcon}>
                        <GraphicEqIcon/>
                        <h4>Audio</h4>
                    </div>
                    {!tattoo.audio
                    ? <div className={classes.audioButtons}>
                        <Link className={classes.audioButton} to={`/audio/${tattoo.id}/record`}>Record</Link>
                        <Link className={classes.audioButton} to={`/audio/${tattoo.id}/upload`}>Upload</Link>
                        </div>
                    : <div className={classes.audioButtons}>
                        <Link className={classes.audioButton} to={`/audio/${tattoo.id}/play`}>Play</Link>
                        <button className={classes.audioButton} onClick={() => handleDelete(tattoo.id)}>Remove</button>
                        </div>}
                </Fragment>
            }
              </div>
            )}
        </div>
      </Page>
    )
}
