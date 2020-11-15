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
import { Link } from "react-router-dom";
import { auth } from "../service/firebase";
import { UserContext } from "../providers/UserProvider";
import Main from "./Main";

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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const classes = useStyles();

  const user = useContext(UserContext);

  // Create user name using firebase function
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((errorMessage) => {
      setErrorMessage(errorMessage.message);
      console.error("Error signing in with password and email", errorMessage);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return user ? (
    <Main />
  ) : (
    <Container
      // component='main'
      maxWidth="xs"
    >
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
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}></Grid>
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
          <div></div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) =>
              signInWithEmailAndPasswordHandler(event, email, password)
            }
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="SignUp">Don't have an account? Sign up here!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
