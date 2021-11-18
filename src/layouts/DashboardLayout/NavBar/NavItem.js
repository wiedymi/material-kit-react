import React, { useEffect, useState } from 'react';
import { Link, NavLink as RouterLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    display: 'flex',
    flexDirection: 'column',
    letterSpacing: 0,
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto',
    marginTop: '5px',
    color: '#898989',
    fontWeight: 'lighter',
    fontSize: '14px'
  },
  active: {
    color: theme.palette.primary.contrastActiveText,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.contrastActiveText
    }
  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const classes = useStyles();
  const [route, setRoute] = useState('')
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/app/tattoos') {
      setRoute('Gallery')
    } else if(location.pathname === '/app/user/tattoos') {
      setRoute('My Tattoos')
    }
  }, [])

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Link
        className={classes.button}
        to={href}
      >
        {Icon && (
          <Icon
            className={classes.icon}
            size="20"
            style={{color: route === title ? 'orangered': '#898989'}}
          />
        )}
        <span className={classes.title}>
          {title}
        </span>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
