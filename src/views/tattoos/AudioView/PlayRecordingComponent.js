import React, {useEffect, useState} from 'react';

import {Box, Button, Icon, makeStyles, Typography} from '@material-ui/core';
// import AudioRecorder from 'audio-recorder-polyfill';
import 'react-voice-recorder/dist/index.css';
import AudioRecorder from 'audio-recorder-polyfill';
import mpegEncoder from 'audio-recorder-polyfill/mpeg-encoder'

import {baseHeaders, baseUrl} from '../../../utils/config';
import { Fragment } from 'react';

const useStyles = makeStyles({
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
  }
});

AudioRecorder.encoder = mpegEncoder
AudioRecorder.prototype.mimeType = 'audio/mpeg'
window.MediaRecorder = AudioRecorder

const PlayRecordingComponent = (tattoo) => {

  const classes = useStyles();
  const localTattoo = tattoo.tattoo
  const [paused, setPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0)

  if(localTattoo.audio) {
    setInterval(() => {
      const e = document.getElementById(`recordedAudio-${localTattoo.id}`);
      if(e) {
        setTime(e.currentTime)
      }
    }, 1000)
  }

  const playAudio = () => {
    const e = document.getElementById(`recordedAudio-${localTattoo.id}`);
    e.muted = false;
    e.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    const e = document.getElementById(`recordedAudio-${localTattoo.id}`);
    e.pause();
  };

  const stopAudio = () => {
    const e = document.getElementById(`recordedAudio-${localTattoo.id}`);
    e.pause();
    e.currentTime = 0;
    setIsPlaying(false);
    setPaused(false);
  };

  const displayTime = () => {
    const e = document.getElementById(`recordedAudio-${localTattoo.id}`);
    if(e) {
      return <span>
        {new Date(Math.floor(time) * 1000).toISOString().substr(11, 8)}
      </span>
    }
  };

  const recordControls = () => {
    return (
      <div>
          {isPlaying
          ? <Fragment>
            {paused
            ? <Button onClick={() => {
                playAudio()
                setPaused(false)
            }} className={classes.mainBtn}>Resume</Button>
            : <Button onClick={() => {
                pauseAudio()
                setPaused(true)
            }} className={classes.mainBtn}>Pause</Button>}
            </Fragment>
          : 
            <Button onClick={() => playAudio()} className={classes.mainBtn}>Play</Button>}
            <Button onClick={() => stopAudio()} className={classes.mainBtn}>Stop</Button>
        </div>
    )
  }

  return (
        <div>
            <audio id={`recordedAudio-${localTattoo.id}`} controls="true" preload="false" src={localTattoo.audio} hidden={true}/>
            <Box className={classes.uploadAudioButtonWrapper}>
                <Typography className={classes.typographyPlaceHolder}>
                <div className={classes.time}>
                {displayTime()}
                </div>
                </Typography>
                {recordControls()}
            </Box>
        </div>
  );
};

export default PlayRecordingComponent;
