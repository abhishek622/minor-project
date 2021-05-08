import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import GitHubIcon from '@material-ui/icons/GitHub';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { grey } from '@material-ui/core/colors';
import './css/Conversation.css';
import Member from './Member';
import Messages from './Messages';
import Input from './Input';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appBarLink: {
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      color: '#000000',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  grey: {
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
  },
}));

const ENDPOINT = 'https://codex-minor-project.herokuapp.com/';
// const ENDPOINT = 'http://localhost:5000';
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    var connectionOptions = {
      'force new connection': true,
      reconnectionAttempts: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
    };

    socket = io(ENDPOINT, connectionOptions);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <a href="/" className={classes.appBarLink}>
        <MenuItem>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <p>Exit</p>
        </MenuItem>
      </a>
      <a
        href="https://github.com/abhishek622/minor-project"
        target="_blank"
        rel="noreferrer"
        className={classes.appBarLink}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <GitHubIcon />
          </IconButton>
          <p>Github repo</p>
        </MenuItem>
      </a>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerToggle}
          >
            {' '}
            <Avatar className={classes.grey}>
              <GroupRoundedIcon />
            </Avatar>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {room}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <a href="/" className={classes.appBarLink}>
              <IconButton color="inherit">
                <ExitToAppIcon />
              </IconButton>
            </a>
            <a
              href="https://github.com/abhishek622/minor-project"
              target="_blank"
              rel="noreferrer"
              className={classes.appBarLink}
            >
              <IconButton
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
            </a>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Member users={users} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Member users={users} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="conversation">
          <Messages messages={messages} name={name} />

          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default Chat;
