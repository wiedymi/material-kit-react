import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    backgroundColor: theme.palette.background.dark,
    outline: 'none',
    borderRadius: 12,
    padding: '10px 10px 10px 40px',
    boxShadow: '0 2px 5px 2px #ddd',
  }
}));

const Toolbar = ({ search, setSearch, searchName }) => {
  const classes = useStyles();

  return (
    <div>
      <Box mt={3} marginX={5}>
        <TextField
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                  disableUnderline: true
                }}
                placeholder="Search"
                className={classes.searchInput}
                onChange={e => setSearch(e.target.value)}
              />
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
