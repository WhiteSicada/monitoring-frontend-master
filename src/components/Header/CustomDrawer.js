import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Collapse,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import bcpIcon from "../../images/bcp-icon.png";
import largeLogo from "../../images/logo-gbp.png";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CustomSubDrawer from "./CustomSubDrawer";
import { DrawerData } from "./DrawersData";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import Countdown from "react-countdown";
import { getTests } from "../../redux/actions/TestActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  avatar: {
    backgroundColor: "transparent",
    color: "#2c0b06",
  },
  appBar: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: 235,
    marginTop: 85,
  },
  largeLogo: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  icon: {
    color: "rgba(0, 0, 0, 0.54)",
    display: "inline - flex",
    minWidth: 0,
    flexShrink: 0,
    paddingLeft: "1rem",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  bcpIcon: {
    height: 40,
    width: 40,
    marginRight: 16,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
  },
}));

function MyCountdownTimer({ interval }) {
  // a hook for the current time index
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  // a hook for the current time
  const [currentTime, setCurrentTime] = useState(
    Date.now() + interval * 60 * 1000
  );
  // return a render
  return (
    <Countdown
      date={currentTime}
      key={currentTimeIndex}
      onComplete={() => {
        console.log("hhh");
        // move to next time index
        setCurrentTimeIndex(currentTimeIndex + 1);
        // reset current time
        setCurrentTime(Date.now() + interval * 60 * 1000);
      }}
      renderer={({ hours, minutes, seconds, completed }) => {
        // render completed
        if (completed) return <span>You are good to go!</span>;
        // render current countdown time
        return (
          <span>
            {hours}:{minutes}:{seconds}
          </span>
        );
      }}
    />
  );
}

function CustomDrawer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTests());
  }, []);
  const tests = useSelector((state) => state.testState.tests);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const Completionist = () => <span>You are good to go!</span>;
  let times = [10000, 10000, 10000, 10000];
  const renderer = ({ hours, minutes, seconds, completed, api, props }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <img
              src={largeLogo}
              alt="Kitty Katty!"
              className={classes.largeLogo}
            />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        <List>
          <Link to="/" style={{ textDecoration: "none", color: "#2c0b06" }}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  alt={"BCP Icon"}
                  src={bcpIcon}
                  className={classes.bcpIcon}
                />
              </ListItemAvatar>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          {DrawerData.map((item, index) => {
            return <CustomSubDrawer item={item} key={index} />;
          })}
          <ListItem button>
            <ListItemIcon>
              <AiOutlineClockCircle
                style={{ fontSize: 35, color: "#2c0b06" }}
              />
            </ListItemIcon>
            <ListItemText primary={"Tests Timer"} />
          </ListItem>
          <Collapse in timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {tests.map((test, index) => (
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BsClock style={{ fontSize: 20, color: "#ec6413" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={test.name}
                    secondary={<MyCountdownTimer interval={test.interval} />}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
        </List>
      </Drawer>
    </div>
  );
}

export default CustomDrawer;
