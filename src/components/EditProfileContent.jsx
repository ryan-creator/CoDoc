import React, { useState, useContext } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Papers from "../resources/papers";
import { auth, updateUserDocument } from "../service/firebase";
import { UserContext } from "../providers/UserProvider";

const styles = (theme) =>
  createStyles({
    text: {
      textAlign: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    Button: {
      margin: "10px",
    },
  });

function Contact(props) {
  const { classes } = props;
  const user = useContext(UserContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [papers, setPapers] = useState(user.papers);
  const [email] = useState(user.email);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editing, setEditing] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "edit") {
      setEditing(true);
    } else if (name === "save") {
      setEditing(false);
      updateUserDocument(auth.currentUser, { firstName, lastName, papers });
    }
  };

  //Uses firebase function to send reset email
  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
        }, 20000);
      })
      .catch(() => {
        setErrorMessage("Error Resetting Password, ensure Email correct");
      });
  };

  return (
    <Box className={classes.text}>
      <Grid
        container
        direction="column"
        justify="centre"
        alignItems="centre"
        spacing="2"
      >
        <Typography variant="h5">Edit Profile Information</Typography>
        {errorMessage != null && (
          <div>
            <Alert severity="error">{errorMessage}</Alert>
          </div>
        )}
        {emailSent === true && (
          <div>
            <Alert severity="success">
              Email sent! <Link to="/SignIn">Click here go Sign In</Link>
            </Alert>
          </div>
        )}
        <Grid item xs="12">
          <Button
            type="submit"
            style={{ minWidth: "125px" }}
            name={!editing ? "edit" : "save"}
            variant="contained"
            color={!editing ? "secondary" : "primary"}
            onClick={(event) => onChangeHandler(event)}
          >
            {!editing ? "Edit" : "Save"}{" "}
          </Button>
        </Grid>
        <Grid item xs="12">
          <TextField
            disabled={!editing ? true : false}
            name="firstName"
            value={firstName}
            onChange={(event) => onChangeHandler(event)}
          />
        </Grid>
        <Grid item xs="12">
          <TextField
            disabled={!editing ? true : false}
            name="lastName"
            value={lastName}
            onChange={(event) => onChangeHandler(event)}
          />
        </Grid>
        <Grid item xs="12">
          <Autocomplete
            disabled={!editing ? true : false}
            style={{ width: 400, display: "inline-flex" }}
            multiple
            id="tags-standard"
            filterSelectedOptions
            options={Papers}
            value={papers}
            onChange={(event, newValue) => {
              setPapers(newValue);
              console.log(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Edit Your Papers:"
              />
            )}
          />
        </Grid>
        <Grid item xs="12">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => sendResetEmail(event, email)}
          >
            Email Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(styles)(Contact);
