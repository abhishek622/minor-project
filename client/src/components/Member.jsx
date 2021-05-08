import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

const Member = ({ users }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar}>
        <ListItemText>
          <Typography variant="h5" className={classes.title}>
            Active Members
          </Typography>
        </ListItemText>
        <Divider />
      </div>
      {users ? (
        <List>
          {users.map(({ name }, index) => (
            <ListItem key={name}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <Avatar className={classes.pink}>
                    <AccountCircleIcon />
                  </Avatar>
                ) : (
                  <Avatar className={classes.green}>
                    <AccountCircleIcon />
                  </Avatar>
                )}
              </ListItemIcon>
              <ListItemText primary={name} />
              <Divider />
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default Member;
