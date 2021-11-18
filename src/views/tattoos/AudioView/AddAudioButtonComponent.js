import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'
import queryString from 'query-string';
import {Box, Button, Icon, makeStyles, Typography} from '@material-ui/core';
// import AudioRecorder from 'audio-recorder-polyfill';
import 'react-voice-recorder/dist/index.css';
import AudioRecorder from 'audio-recorder-polyfill';
import mpegEncoder from 'audio-recorder-polyfill/mpeg-encoder'

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
  typographyPlaceHolder2: {
    textTransform: 'capitalize',
    color: '#fde000'
  },
  iconButtonWrapper: {
    width: '50%',
    height: '50%'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  mainBtn: {
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
  prompt: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    right: '5%',
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
  givePermissions: {
    padding: '10px',
    margin: '20px',
    textAlign: 'center',
    color: 'orangered',
    background: 'lightgray',
    borderRadius: '10px'
  }
});

AudioRecorder.encoder = mpegEncoder
AudioRecorder.prototype.mimeType = 'audio/mpeg'
window.MediaRecorder = AudioRecorder

const AddAudioButtonComponent = (tattooId) => {
  const classes = useStyles();
  const [audioData, setAudioData] = useState({
    isRecording: false,
    isBlocked: false
  });
  const [showPrompt, setShowPrompt] = useState(false)
  const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [paused, setPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const navigate = useNavigate();

  const [stime, setStime] = useState(Date.now());
  const [time, setTime] = useState(Date.now());
  const [recordTime, setRecordTime] = useState(0);
  const { search } = useLocation();
  const [design, setDesign] = useState(null)
  const values = queryString.parse(search);
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
 
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now())
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   if(audioData.isRecording) {
  //     setRecording(true)
  //   } else {
  //     setRecording(false)
  //   }
  // }, [audioData.isRecording])

  const checkMicrophonePermissions = () => {
    console.log('checking checkMicrophonePermissions');
    navigator.mediaDevices.getUserMedia({audio: true})
    .then((mediaStream) => {
        console.log('Permission Granted');
        setAudioData({...audioData, isBlocked: false});
    })
    .catch((err) => {
      console.log('Permission Denied');
      setAudioData({...audioData, isBlocked: true});
    })
  };

  const startAudioRecordingHandler = async (rowId) => {
    console.log('checking startAudioRecordingHandler');
    await checkMicrophonePermissions();

    if (!audioData.isBlocked) {
      navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        const mediaRec = new AudioRecorder(stream)
        mediaRec.addEventListener('dataavailable', e => {
          setAudio(e.data);
          setAudioURL(URL.createObjectURL(e.data));
        })
        setMediaRecorder(mediaRec)
        mediaRec.start();
        setTime(Date.now());
        setStime(Date.now());
        setAudioData({...audioData, isRecording: true});
      })
    } else {
      
    }
  };

  const stopAudioRecordingHandler = (rowId) => {
    if (mediaRecorder !== null && !audioData.isBlocked) {
      mediaRecorder.stop();
      mediaRecorder.requestData()
      setMediaRecorder(null)
      setRecordTime(parseInt(((time - stime) / 1000), 10) + pausedTime)
      setPausedTime(0)
    }
  };

  const playRecording = () => {
    const e = document.getElementById(`recordedAudio-${tattooId.tattooId}`);
    e.play()
  };

  const discardRecording = () => {
    setAudioData({...audioData, isRecording: false});
    setRecordTime(0);
    setAudio(null);
    setAudioURL(null);
  };

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
            navigate('/app/user/tattoos', { replace: true });
          });
        } else {
          // do something
        }
      }).catch(() => {
        // do something
      });
    }
  };

  const displayTime = () => {
    if (mediaRecorder === null && audio !== null) {
      return new Date(recordTime * 1000).toISOString().substr(11, 8);
    }
    if (paused) {
      return new Date(pausedTime * 1000).toISOString().substr(11, 8);
    }
    return new Date((parseInt(((time - stime) / 1000), 10) + pausedTime) * 1000).toISOString().substr(11, 8);
  };

  const recordControls = () => {
    if (mediaRecorder === null && audio !== null) {
      return <div>
        <Button onClick={() => playRecording()} className={classes.secBtn}>
          <Typography className={classes.typographyPlaceHolder}>
            {audioURL && <audio id={`recordedAudio-${tattooId.tattooId}`} src={audioURL} hidden></audio>}
            Preview
          </Typography>
        </Button>
        <Button onClick={() => handleAudioUpload()} className={classes.secBtn}>
          <Typography className={classes.typographyPlaceHolder2}>
            Save
          </Typography>
        </Button>
        <Button onClick={() => discardRecording()} className={classes.secBtn}>
          <Typography className={classes.typographyPlaceHolder}>
            Discard
          </Typography>
        </Button>
      </div>
    }
    return (
      <div>
          {paused
          ? <Button onClick={() => {
            mediaRecorder.resume()
            setPaused(false)
            setTime(Date.now());
            setStime(Date.now());
          }} className={classes.mainBtn}>Resume</Button>
          : <Button onClick={() => {
            mediaRecorder.pause()
            setPaused(true)
            setPausedTime(pausedTime + parseInt(((time - stime) / 1000), 10))
          }} className={classes.mainBtn}>Pause</Button>}
          <Button onClick={() => stopAudioRecordingHandler(tattooId)} className={classes.mainBtn}>Stop</Button>
        </div>
    )
  }

  return (
    <div className={classes.root}>
      {!audioData.isRecording ? (
        <>
        <div className={classes.buttons}>
          <Button onClick={() => startAudioRecordingHandler(tattooId)} className={classes.mainBtn}>Start</Button>
          <Button onClick={() => stopAudioRecordingHandler(tattooId)} className={classes.mainBtn}>Stop</Button>
        </div>
        {audioData.isBlocked && <Typography variant="h5" className={classes.givePermissions}>Microphone permission is required to record voice</Typography>}
        </>
      ) : (
        <Box className={classes.uploadAudioButtonWrapper}>
          <Typography className={classes.typographyPlaceHolder}>
            <div className={classes.time}>
            {displayTime()}
            </div>
          </Typography>
          {recordControls()}
        </Box>
      )}
      <Box className={showPrompt ? classes.prompt : classes.disable}>
        <Typography variant="h4">Looks like missed a step. Please contact admin and make the payment.</Typography>
        <Link to="/app/tattoos" className={classes.pBtn}>Prompt admin</Link>
      </Box>
    </div>
  );
};

export default AddAudioButtonComponent;
