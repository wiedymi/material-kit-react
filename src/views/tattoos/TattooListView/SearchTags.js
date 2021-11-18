import React from 'react'
import {
    Box,
    Container,
    makeStyles
  } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '40px 10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tag: {
        height: '60px',
        width: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '50%',
        fontWeight: '400',
        fontSize: '12px',
        boxShadow: '0 2px 5px 2px #ddd',
        color: '#898989'
    }
}))

export default function SearchTags({ setSearch }) {
    const classes = useStyles();
    const tags = ['love', 'Fun', 'Music', 'Art']

    return (
        <Container className={classes.container}>
            {tags.map((tag, idx) => (
                <div className={classes.tag} key={idx}>{tag}</div>
            ))}
        </Container>
    )
}
