import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MenuIcon from "@material-ui/icons/Menu";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { auth, updateUserDocument } from "../service/firebase";
import clsx from "clsx";
import {
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SettingsIcon from "@material-ui/icons/Settings";
import { UserContext } from "../providers/UserProvider";
import PropTypes from "prop-types";
import Summary from "./Summary";
import Lecture from "./Lecture";
import Tutorial from "./Tutorial";
import Exam from "./Exam";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Papers from "../resources/papers";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { red } from "@material-ui/core/colors";
import { Context } from "../providers/PaperProvider";
import Messaging from "./MessagingFunction";
import Fab from '@material-ui/core/Fab';
import UploadTest from './UploadTest';

const lightColor = "rgba(255, 255, 255, 0.7)";
const drawerWidth = 230;

const styles = (theme) =>
  createStyles({
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    link: {
      textDecoration: "none",
      color: lightColor,
      "&:hover": {
        color: theme.palette.common.white,
      },
    },
    deleteLink: {
      textDecoration: "none",
      color: "#FF0000",
      "&:hover": {
        color: "#AA0000",
      },
    },
    button: {
      borderColor: lightColor,
    },
    hide: {
      display: "none",
    },

    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover,&:focus": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      },
    },
    itemCategory: {
      backgroundColor: "#232f3e",
      boxShadow: "0 -1px 0 #404854 inset",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
      color: theme.palette.common.white,
    },
    itemActiveItem: {
      color: "#4fc3f7",
    },
    itemPrimary: {
      fontSize: "inherit",
    },
    itemIcon: {
      minWidth: "auto",
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 1,
      },
    },

    margin: {
      position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    },

    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    root: {
      display: "flex",
    },
    hidden: {
      display: "none",
    },
  });

function Navigation(props) {
  const { classes, onDrawerToggle, tabs, title, drawer, ...other } = props;
  const [del, setDelete] = React.useState(false);
  const [open, setOpen] = React.useState(drawer);
  const [value, setValue] = React.useState(0);
  const user = React.useContext(UserContext);
  const theme = useTheme();
  let options = user.papers;
  const [openUpload, setOpenUpload] = React.useState(false);
  const [dopen, setdOpen] = React.useState(false);
  const [paper, setPapers] = useState([]);
  const [aopen, setaOpen] = React.useState(false);
  const [state, dispatch] = useContext(Context);
  const [bar, setBar] = useState(false);


  function updatePaper() {
    if (!user) return;

    if (del) {
      const temp = options;
      console.log(temp);
      clearOptions();
      temp.forEach((item) => {
        console.log("Item: " + item);
      });
    } else {
      paper.forEach((item) => options.push(item));
    }

    const firstName = user.firstName;
    const lastName = user.lastName;
    const papers = options;
    updateUserDocument(user, { firstName, lastName, papers });
    setPapers([]);
    setDelete(false);
  }

  const handleUploadOpen = () => {
    setOpenUpload(true);
  };

  const handleUploadClose = () => {
    setOpenUpload(false);
  };

  function clearOptions() {
    while (options.length > 0) {
      options.pop();
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deletePaper = () => {
    if (del) {
      setDelete(false);
    } else {
      setDelete(true);
    }
  };

  const handleClickOpenAlert = () => {
    setaOpen(true);
  };

  const handleCloseAlertConfirm = () => {
    updatePaper();
    setaOpen(false);
  };

  function paperClicked() {
    if (del) {
      handleClickOpenAlert();
    }
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return bar ? (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    ) : (
      <div className={classes.hidden} />
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const handleClickOpen = () => {
    console.log("Handle click open");
    setdOpen(true);
  };

  const handleCloseSave = () => {
    updatePaper();
    setdOpen(false);
  };

  const handleClose = () => {
    setPapers([]);
    setdOpen(false);
    setDelete(false);
    setaOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <React.Fragment>
        <AppBar
          color="primary"
          elevation={0}
          position="sticky"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Log Out
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  component={Link} to="/contact"
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  Contact
                </Button>
              </Grid>
              <Grid>
                <IconButton component={Link} to="/editProfile">
                  <SettingsIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="inherit"
                  className={classes.iconButtonAvatar}
                >
                  <Avatar
                    src="/static/images/avatar/1.jpg"
                    alt={user.firstName}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          color="primary"
          position="sticky"
          elevation={0}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  {title === "Welcome" ? title + " " + user.firstName : title}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          color="primary"
          position="sticky"
          elevation={0}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          {bar ? (
            <Tabs value={value} textColor="inherit" onChange={handleChange}>
              <Tab textColor="inherit" label="Summary" {...a11yProps(0)} />
              <Tab
                textColor="inherit"
                label="Lecture Notes"
                {...a11yProps(1)}
              />
              <Tab
                textColor="inherit"
                label="Tutorial Notes"
                {...a11yProps(2)}
              />
              <Tab textColor="inherit" label="Past Exams" {...a11yProps(3)} />
              <Tab
                textColor="inherit"
                label="Discussion  Board"
                {...a11yProps(4)}
              />
            </Tabs>
          ) : (
            <Tabs value={value} textColor="inherit" onChange={handleChange}>
              <Tab textColor="inherit" label="" />
            </Tabs>
          )}
        </AppBar>

        <Drawer
          {...other}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose} color="primary">
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>

          <Box height="46px" />

          <ListItem className={clsx(classes.firebase)}>CoDoc</ListItem>

          <Divider />

          <List>
            <ListItem className={classes.link} button component={Link} to="/" >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>

          <Divider />

          <List>
            {options.map((text, index) => (
              <ListItem
                key={text}
                className={del ? classes.deleteLink : classes.link}
                button
                onClick={() => {
                  setBar(true);
                  setPapers([text]);
                  // setP(text);
                  paperClicked();
                  dispatch(text);
                }}
              >
                <ListItemIcon>
                  {del ? (
                    <DeleteIcon style={{ color: red[500] }} />
                  ) : (
                    <SchoolIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem className={classes.link} button onClick={handleClickOpen}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add Papers" />
            </ListItem>
            <ListItem className={classes.link} button onClick={deletePaper}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary={del ? "Cancel" : "Delete Paper"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              className={classes.link}
              button
              component={Link}
              to="/contact"
            >
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
            <ListItem
              className={classes.link}
              button
              component={Link}
              to="/about"
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </List>
        </Drawer>

        <Dialog
          open={dopen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Select A Paper</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Type in any of the papers you want to add.
            </DialogContentText>
            <div>
              <Autocomplete
                multiple
                id="tags-standard"
                filterSelectedOptions
                options={Papers}
                value={paper}
                onChange={(event, newValue) => {
                  setPapers(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Please Select Your Papers:"
                  />
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseSave} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={aopen} onClose={handleClose}>
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you want to delete this paper?"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseAlertConfirm} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>


      <TabPanel value={value} index={0}>
      <Dialog open={openUpload} onClose={handleUploadClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload</DialogTitle>
        <DialogContent>
          <UploadTest/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUploadClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUploadClose} color="primary">
              Finish
            </Button>
        </DialogActions>
      </Dialog>
        <Fab variant="extended" color="primary" onClick={handleUploadOpen} aria-label="add" className={classes.margin}>
          Upload Resources
        </Fab>
        <Summary />
      </TabPanel>


      <TabPanel value={value} index={1}>
      <Dialog open={openUpload} onClose={handleUploadClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload</DialogTitle>
        <DialogContent>
          <UploadTest/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUploadClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUploadClose} color="primary">
              Finish
            </Button>
        </DialogActions>
      </Dialog>
        <Fab variant="extended" color="primary" onClick={handleUploadOpen} aria-label="add" className={classes.margin}>
          Upload Resources
        </Fab>
        <Lecture />
      </TabPanel>



      <TabPanel value={value} index={2}>
      <Dialog open={openUpload} onClose={handleUploadClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload</DialogTitle>
        <DialogContent>
          <UploadTest/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUploadClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUploadClose} color="primary">
              Finish
            </Button>
        </DialogActions>
      </Dialog>
        <Fab variant="extended" color="primary" onClick={handleUploadOpen} aria-label="add" className={classes.margin}>
          Upload Resources
        </Fab>
        <Tutorial />
      </TabPanel>



      <TabPanel value={value} index={3}>
      <Dialog open={openUpload} onClose={handleUploadClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload</DialogTitle>
        <DialogContent>
          <UploadTest/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUploadClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUploadClose} color="primary">
              Finish
            </Button>
        </DialogActions>
      </Dialog>
        <Fab variant="extended" color="primary" onClick={handleUploadOpen} aria-label="add" className={classes.margin}>
          Upload Resources
        </Fab>
        <Exam />
      </TabPanel>

      
      <TabPanel value={value} index={4}>
        <Messaging />
      </TabPanel>
    </div>
  );
}

export default withStyles(styles)(Navigation);
