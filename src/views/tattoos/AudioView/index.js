import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {
    Container,
    makeStyles,
    Typography,
    Button,
    Box
} from '@material-ui/core';
import queryString from 'query-string';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'src/components/Page';
import {baseHeaders, baseUrl} from '../../../utils/config';
import AddAudioButtonComponent from './AddAudioButtonComponent';
import UploadAudioComponent from './UploadAudioComponent';
import PlayRecordingComponent from './PlayRecordingComponent';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      position: 'relative'
    },
    toolbar: {
        paddingLeft: '10px',
        height: '80px',
        paddingTop: '25px'
    },
    title: {
        textAlign: 'center',
        fontSize: '30px',
        marginTop: '00px'
    },
    content: {
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: '200px',
        objectFit: 'cover',
        marginBottom: '20px'
    },
    audioIcon: {
      textAlign: 'center',
      marginBlock: '35px',
      fontSize: '20px'  
    },
}));

const AudioView = ({ user, token }) => {
    const [tattoo, setTattoo] = useState({});
    const [recording, setRecording] = useState(false);
    const classes = useStyles();
    let { id, type } = useParams();
    const { search } = useLocation();
    const values = queryString.parse(search);
    const history = createBrowserHistory();

    useEffect(() => {
        if(!values.design) {
          fetch(`${baseUrl}/tattoo/${id}/`, {
              headers: {
                ...baseHeaders,
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                response.json().then((data) => {
                  setTattoo(data);
                });
              } else {
              // do something
              }
          }).catch(() => {
            // do something
          });
        } else {
          fetch(`${baseUrl}/designs/${id}/`, {
              headers: {
                ...baseHeaders,
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                response.json().then((data) => {
                  setTattoo(data);
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
                    });
                  } else {
                  // do something
                  }
              }).catch(() => {
                // do something
              });
              }
          }).catch(() => {
            // do something
          });
        }
    }, [id])

    return (
        <Page
            className={classes.root}
            title="Audio">
            <Container maxWidth={false}>
                <div className={classes.toolbar}>
                    <div style={{position: 'absolute', left: '20px', top: '30px'}} onClick={() => history.back()}>
                      <KeyboardBackspaceIcon fontSize="14px" color="#000"/>
                    </div>
                    <h3 className={classes.title}>{type === 'play' ? 'Play audio' : 'Create audio'}</h3>
                </div>
                <div className={classes.content}>
                    {tattoo.image ?
                    <img className={classes.image} src={tattoo.image} alt="Image"/>
                    : <img className={classes.image} src={`/static/placeholder-1.png`} alt="Image" style={{ maxWidth: '100px' }}/>}
                    <h2 style={{fontWeight: 500}}>{tattoo.name}</h2>
                    <div className={classes.audioIcon}>
                        <GraphicEqIcon style={recording ? { color: 'white' } : { color: '#fde000' }}/>
                        <h3 style={{fontWeight: 500}}>Audio</h3>
                    </div>
                    {type === 'record' && <AddAudioButtonComponent tattooId={id} design={values.design ? true : false}/>}
                    {type === 'upload' && <UploadAudioComponent tattooId={id} design={values.design ? true : false}/>}
                    {type === 'play' && <PlayRecordingComponent tattoo={tattoo} /> }
                </div>
            </Container>
        </Page>
    )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    token: state.isLoggedIn
  };
};

export default connect(mapStateToProps)(AudioView);
