import React, { useContext } from "react";
import {
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { AppBar, Paper } from "@material-ui/core";
import {Context} from '../providers/PaperProvider';
import DisplayLecture from "./DisplayLecture";

const styles = (theme) =>
  createStyles({
    text: {
      textAlign: 'center',
      marginTop: '200px',
    },
    paper: {
      maxWidth: '740px',
      margin: 'auto',
      overflow: 'hidden',
    },
  });

function Lecture(props) {
  const { classes } = props;
  const [state] = useContext(Context);

  return (
    <Paper className={classes.paper}>
    <AppBar position="static" color="default" elevation={0}>
            <Typography className={classes.title} variant="h3" align='center'>
              {state}
            </Typography>
    </AppBar>
    <div className={classes.contentWrapper}>
      <DisplayLecture />
    </div>
  </Paper> 
  );
}

export default withStyles(styles)(Lecture);
