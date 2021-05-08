import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://raw.githubusercontent.com/abhishek622/svg-collection/f3a7ce09bbcd51f369a903f1ba9ec4f701f8e4cb/edu%20and%20online/4%20SCENE.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Join
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="grpName"
              label="Group Name"
              id="grpName"
              autoComplete="grpName"
              onChange={event => setRoom(event.target.value)}
            />
            <Link
              onClick={e => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?name=${name}&room=${room}`}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Join In
              </Button>
            </Link>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Join;
