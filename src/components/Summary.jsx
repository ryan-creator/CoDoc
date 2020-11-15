import React, { useContext, useState } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Context } from "../providers/PaperProvider";
import { AppBar, Paper, Typography } from "@material-ui/core";
import firebase from "../service/firebase";

const styles = (theme) =>
  createStyles({
    text: {
      textAlign: "center",
      marginTop: "200px",
    },
    paper: {
      maxWidth: 1000,
      margin: "auto",
      overflow: "hidden",
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: "block",
    },
    contentWrapper: {
      margin: "40px 16px",
    },
    title: {
      color: "#000000",
      padding: "10px",
    },
  });

function Summary(props) {
  const { classes } = props;
  const [state] = useContext(Context);
  const [description, setDescription] = useState("");

  try {
    firebase
      .ref("paper/" + state + "/description")
      .once("value", function (snapshot) {
        if (snapshot.val() != null) {
          setDescription(snapshot.val().toString());
        }
      });
  } catch (err) {
    console.log("Error getting paper description from firebase");
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <AppBar position="static" color="default" elevation={0}>
          <Typography className={classes.title} variant="h3" align="center">
            {state}
          </Typography>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary">{description}</Typography>
        </div>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Summary);
