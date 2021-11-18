import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MdCropFree } from 'react-icons/md';

import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import TattooCard from './TattooCard';
import { baseHeaders, baseUrl } from '../../../utils/config';
import SearchTags from './SearchTags';

const gridHeights = [250, 300, 350];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '100%',
    paddingBottom: theme.spacing(8)
  },
  ImageCard: {
    width: '150px',
    height: '100%',
    padding: 0,
    margin: 0
  },
  ImageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '0 20px',
    gridAutoRows: '9px'
  },
  audioCard: {
    backgroundColor: '#fff',
    padding: '10px 4px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative'
  },
  audioIcon: {
    textAlign: 'center',
    marginBottom: '10px'
  },
  audioButtons: {
    display: 'flex',
    justifyContent: 'space-between'
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
  floatingBtn: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    zIndex: 1002
  }
}));

const TattooList = (props) => {
  const classes = useStyles();
  const { tattoosList, token, setTattoosList } = props;
  const [updated, setUpdated] = useState(true)
  const [tattoos, setTattoos] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const pageRef = useRef(page);
  const searchRef = useRef(search);
  const hasMoreRef = useRef(false);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        if(hasMoreRef.current) {
            fetch(`${baseUrl}/tattoo/?name_icontains=${searchRef.current}&page=${pageRef.current}`, {
            headers: {
              ...baseHeaders,
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setTattoosList(data);
                if(data.next) {
                  pageRef.current = pageRef.current + 1;
                  setPage(page + 1);
                } else {
                  hasMoreRef.current = false
                }
              });
            } else {
            // do something
            }
          }).catch(() => {
          // do something
          });
        }
      }
    })
    if(node) observer.current.observe(node)
  }, [])

  useEffect(() => {
    searchName()
  }, [search])

  const searchName = () => {
    pageRef.current = 1;
    fetch(`${baseUrl}/tattoo/?name__icontains=${search}&page=${page}`, {
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const tattooList = data.results.sort((a, b) => a.id - b.id)
          setTattoos(tattooList);
          if(data.next) {
            hasMoreRef.current = true;
            pageRef.current = pageRef.current + 1;} else {
              hasMoreRef.current = false
            }
        });
      } else {
      // do something
      }
    }).catch(() => {
    // do something
    });
  }

  useEffect(() => {
    if(tattoosList) {
      if(pageRef.current > 1) {
        const tattooList = tattoosList.results.sort((a, b) => a.id - b.id)
        setTattoos([...tattoos, ...tattooList])
      }
    }
  }, [tattoosList])

//   const handleScroll = () => {
//     setSelectedCard(null)
//   }

//   useEffect(() => {
//     document.getElementById('content').addEventListener('scroll', handleScroll, { passive: true });

//     return () => {
//       document.getElementById('content').removeEventListener('scroll', handleScroll);
//     };
// }, []);3

  return (
    <Page
      className={classes.root}
      title="Designs"
    >
      <Container maxWidth={false} onScroll={() => handleScroll()}>
        <Toolbar search={search} setSearch={setSearch}/>
        <SearchTags searchName={searchName} setSearch={setSearch}/>
        <Box>
            <div className={classes.ImageGrid}>
              {tattoos.map((tattoo, idx) => {
                var height = _.sample(gridHeights);
                return(
                  <div ref={lastElementRef} style={{gridRowEnd: `span ${Math.ceil(height / 8)}`}}>
                    <TattooCard tattoo={tattoo} height={height} design={false}/>
                  </div>
              )})}
            </div>
        </Box>
        <Link to="/camera/scan" className={classes.floatingBtn}>
          <MdCropFree size={30}/>
        </Link>
      </Container>
    </Page>
  );
};

TattooList.propTypes = {
  tattoosList: PropTypes.object,
  token: PropTypes.string,
  setTattoosList: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    tattoosList: state.tattoosList,
    token: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTattoosList: (tattoosList) => dispatch({ type: 'SET_TATTOOS_LIST', tattoosList })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TattooList);
