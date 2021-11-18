import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'
import {Box, Button, Icon, makeStyles, Typography} from '@material-ui/core';
import 'react-voice-recorder/dist/index.css';
import queryString from 'query-string';
import {baseHeaders, baseUrl, iosHeaders} from '../../../utils/config';

const useStyles = makeStyles({
    root: {
      position: 'relative'
    },
    uploadAudioButtonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '30px'
    },
    typographyPlaceHolder: {
      textTransform: 'capitalize'
    },
    iconButtonWrapper: {
      width: '50%',
      height: '50%'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'center'
    },
    mainBtn: {
        appearance: 'none',
        WebkitAppearance: 'none',
        backgroundColor: '#fde000',
        padding: '10px 30px',
        borderRadius: '10px',
        fontSize: '18px',
        marginInline: '20px',
        boxShadow: '0 2px 5px 2px #ddd',
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    secBtn: {
      padding: '7px 15px',
      borderRadius: '7px',
      fontSize: '14px',
      marginInline: '5px',
      boxShadow: '0 2px 5px 2px #ddd'
    },
    time: {
      fontSize: '22px',
      marginBottom: '20px'
    },
    input: {
        display: 'none'
    },
    prompt: {
      position: 'absolute',
      top: '10%',
      left: '10%',
      right: '10%',
      padding: '15%',
      zIndex: 0,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      borderRadius: '5%',
      backgroundColor: 'rgba(245,245,245,1)',
    boxShadow: '0 2px 5px 2px #ddd'
    },
    pBtn: {
      padding: '7px 15px',
      borderRadius: '7px',
      fontSize: '14px',
      boxShadow: '0 2px 5px 2px #ddd',
      marginTop: '20px'
    },
    disable: {
      display: 'none'
    },
});

export default function UploadAudioComponent(tattooId) {
    const navigate = useNavigate();
    const classes = useStyles();
    const [audio, setAudio] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false)
    const { search } = useLocation();
    const values = queryString.parse(search);
    const [design, setDesign] = useState(null)
    let { id, type } = useParams();

    useEffect(() => {
      if(values.design) {
          fetch(`${baseUrl}/designs/${id}/`, {
            headers: {
              ...baseHeaders,
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setDesign(data);
              });
            } else {
            // do something
            }
        }).catch(() => {
          // do something
        });
      }
    }, [])

    const handleAudioUpload = () => {
        if(design) {
            if(design.is_paid) {
              const formdata = new FormData();
              formdata.append('design', design.id);
              formdata.append('audio', audio, 'audio.mp3');
              fetch(`${baseUrl}/tattoo/`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formdata
              }).then((response) => {
                navigate('/app/user/tattoos', { replace: true });
              }).catch(() => {
                // do something
              });          
            } else {
              setShowPrompt(true);
            }
        } else {
            const formdata = new FormData();
            formdata.append('audio', audio, 'audio.mp3');
            fetch(`${baseUrl}/tattoo/${tattooId.tattooId}/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formdata
            }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                  navigate('/app/user/tattoos')
                  syncTattooList()
                });
            } else {
                // do something
            }
            }).catch(() => {
            // do something
            });
        }
    };
    
    return (
        <div className={classes.root}>
            {audio
            ? <div className={classes.buttons}>
                <p>{audio.name}</p>
                <Button className={classes.mainBtn} onClick={() => handleAudioUpload()}>Upload</Button>
                <p style={{marginTop: 10}} onClick={() => setAudio(null)}>Remove</p>
            </div>
            : <div>
                <label className={classes.mainBtn}>
                    <input type="file" className={classes.input} onChange={e => setAudio(e.target.files[0])} />
                    Choose file
                </label>
            </div>}
            <Box className={showPrompt ? classes.prompt : classes.disable}>
              <Typography variant="h5">Looks like missed a step. Please contact admin and make the payment.</Typography>
              <Link to="/app/tattoos" className={classes.pBtn}>Prompt admin</Link>
            </Box>
        </div>
    )
}
