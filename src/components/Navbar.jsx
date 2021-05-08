import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

export default function Navbar({ room }) {
  const classes = useStyles();
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
      <a
        href="/"
        style={{ 'text-decoration': 'none', color: 'white' }}
        color="inherit"
      >
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
        style={{ 'text-decoration': 'none', color: 'white' }}
        color="inherit"
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
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <GroupRoundedIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {room}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <a
              href="/"
              style={{ 'text-decoration': 'none', color: 'white' }}
              color="inherit"
            >
              <IconButton color="inherit">
                <ExitToAppIcon />
              </IconButton>
            </a>
            <a
              href="https://github.com/abhishek622/minor-project"
              target="_blank"
              style={{ 'text-decoration': 'none', color: 'white' }}
              color="inherit"
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
    </div>
  );
}
