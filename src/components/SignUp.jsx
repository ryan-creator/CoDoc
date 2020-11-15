import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Papers from "../resources/papers";
import { auth, generateUserDocument } from "../service/firebase";
import { UserContext } from "../providers/UserProvider";
import { Link } from "react-router-dom";
import Main from "../components/Main";

//Create variables for User details
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [papers, setPapers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const classes = useStyles(); //Styling

  const user = useContext(UserContext);

  //Takes event from button press, email and password, creates user account
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      //If user account is created, add them to firestore with Uid and additional information
      generateUserDocument(user, { firstName, lastName, papers });
    } catch (errorMessage) {
      setErrorMessage(errorMessage.message);
    }
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPapers([]);
  };

  //Handles changes of form elements
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    }
  };
  //Sign Up Form
  return user ? (
    <Main />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {errorMessage != null && (
          <div>
            <Alert severity="error">{errorMessage}</Alert>
          </div>
        )}
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => onChangeHandler(event)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
          </Grid>
          <div>
            <Autocomplete
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
                  label="Please Select Your Papers:"
                />
              )}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) =>
              createUserWithEmailAndPasswordHandler(event, email, password)
            }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/">Already have an account? Sign in here!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
//Basic Syle For Material UI Sign In Form, can change to anything else
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default SignUp;
