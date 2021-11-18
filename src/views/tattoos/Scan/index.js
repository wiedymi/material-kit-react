import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Backdrop, Box, Button, CircularProgress, Grid, Icon, makeStyles, Typography} from '@material-ui/core';
import * as PropTypes from 'prop-types';
import queryString from 'query-string'
import Webcam from 'react-webcam';
import Page from '../../../components/Page';
import {baseHeaders, baseUrl } from '../../../utils/config';
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PersonOutlineRounded, CropFreeSharp, CloseRounded, FlipCameraIos, ExitToApp } from '@material-ui/icons';
import { MdCropFree } from 'react-icons/md'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    maxHeight: '100vh',
    fontFamily: 'Roboto'
  },
  form: {
    marginTop: theme.spacing(0)
  },
  camera: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    objectFit: 'cover'
  },
  scanHandler: {
    bottom: theme.spacing(20)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  controller: {
    paddingInline: '40px',
    position: 'fixed',
    bottom: theme.spacing(6),
    zIndex: 1000
  },
  closeBtn: {
    position: 'fixed',
    right: theme.spacing(3),
    top: theme.spacing(3),
    zIndex: 1001
  },
  crop: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#898989'
  }
}));


function converBase64toBlob(content, contentType) {
  let contentStr = content.split(',')
  content = contentStr[1]
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = window.atob(content); //method which converts base64 to binary
  var byteArrays = [
  ];
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  var blob = new Blob(byteArrays, {
    type: contentType
  }); //statement which creates the blob
  return blob;
}

const ScanForm = (props, {...rest}) => {
  const webcamRef = React.useRef(null);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tattoo, setTattoo] = useState(null);
  const [flip, setFlip] = useState("environment");
  const { isLoggedIn, user } = props;
  const token = localStorage.getItem('token');
  const { search } = useLocation();
  const values = queryString.parse(search);
  const navigate = useNavigate();
  const audioRef = useRef();
  const [active, setActive] = useState(true);

  const scanRequest = (imageSrc, share_id) => {
    let blob = converBase64toBlob(imageSrc, 'image/jpeg')

    var formdata = new FormData();
    formdata.append("image", blob, 'scan_image.jpg');
    
    if (share_id) {
      formdata.append("sharing_uuid", share_id);
    }

    setActive(false);
  
    fetch(`${baseUrl}/recognize/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formdata,
        redirect: 'follow'
      }).then((response) => {
        if (response.status === 200) {
          setOpen(false)
          response.json().then((data) => {
            // eslint-disable-next-line react/prop-types
            setTattoo(data)
          });
        } else {
          setOpen(false)
          setTattoo(null)
          setActive(true)
        }
      }).catch(() => {
        setOpen(false)
        setActive(true)
        setTattoo(null)
    });
  }  

  const capture = useCallback(
    async () => {
      setOpen(true)
      const imageSrc = webcamRef.current.getScreenshot();
      if (!isPlaying && imageSrc && active) {
        await scanRequest(imageSrc, isLoggedIn ? values.share_id : null)
      }
    },
    [webcamRef]
  );

  useEffect(() => {
    if(!isLoggedIn && !values.share_id) {
      navigate('/login')
    }
    return () => {
      if(isPlaying) audioRef.current.pause();
    }
  }, [])

  useEffect(() => {
    if(audioRef.current) {
      playAudio();
    }
  }, [audioRef])

  const playAudio = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  }

  const flipCamera = () => {
    if(flip === "environment") {
      setFlip("user")
    } else {
      setFlip("environment")
    }
  }

  return (
    <Page
      className={classes.root}
      title="Scan"
      onClick={capture}
    >
      <audio ref={audioRef} controls="true" preload="false" src={tattoo?.audio} hidden={true} onEnded={() => {
        setActive(true)
        setIsPlaying(false)
      }}/>
      {isLoggedIn && (
        <Box className={classes.closeBtn}>
          <Link to="/app/tattoos">
            <Icon className={classes.iconButtonWrapper} fontSize="small">
              <CloseRounded style={{color: "white", fontSize: 30}}/>
            </Icon>
          </Link>
        </Box>
      )}
      <Box className={classes.crop}
        >
          <MdCropFree size={100} color="#fff"/>
          <h5 style={{color: '#fff', fontWeight: 'lighter'}}>Tap to scan</h5>
          {/* {tattoo && <h5 style={{color: '#fff', fontWeight: 'lighter'}}>Class: {tattoo.class_name} Confidence: {tattoo.confidence}</h5>} */}
      </Box>
      <Grid
        item
        md={12}
        xs={12}
      >
        <Webcam 
          className={classes.camera}
          audio={false}
          mirrored={false}
          ref={webcamRef}
          videoConstraints={{facingMode: { exact: flip }}}
          screenshotFormat="image/jpeg"
        />
        {isLoggedIn ? (
          <Grid container direction="row" align="start" alignItems="stretch" className={classes.controller}>
            <Grid item xs={7}>
              <Link to="/app/user/tattoos">
                <Box>
                  <Icon className={classes.iconButtonWrapper} fontSize="small">
                    <PersonOutlineRounded style={{color: "white", fontSize: 40, zIndex: 99}}/>
                  </Icon>
                </Box>
              </Link>
            </Grid>
            <Grid item align="end" xs={5}>
            <Box onClick={flipCamera}>
              <Icon className={classes.iconButtonWrapper} fontSize="small">
                <FlipCameraIos style={{color: "white", fontSize: 40, zIndex: 99}}/>
              </Icon>
            </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="row" align="start" alignItems="stretch" justify="center" className={classes.controller}>
            <Grid item>
              <Link to="/login">
                <Box>
                  <Icon className={classes.iconButtonWrapper} fontSize="small">
                    <ExitToApp style={{color: "white", fontSize: 40, zIndex: 99}}/>
                  </Icon>
                </Box>
              </Link>
            </Grid>
          </Grid>
        )}
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </Grid>
    </Page>
  );
};

ScanForm.propTypes =
  {
    token: PropTypes.string
  }
;

const mapStateToProps = (state) => {
    return {
      user: state.user,
      isLoggedIn: state.isLoggedIn
    };
  }
;

export default connect(mapStateToProps)(ScanForm);
