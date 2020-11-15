import React from "react";
import {
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";


const styles = (theme) =>
  createStyles({
    text: {
      textAlign: 'center',
      marginTop: '200px',
    },
    header: {
      padding: '15px',
      textAlign: 'center',
    },
  });

function Contact(props) {
  const { classes } = props;

  return (
    <div>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h5" className={classes.header}>
          Contact Us
        </Typography>
        <form>
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
              // value={firstName}
              //  onChange={(event) => onChangeHandler(event)}
              // autoFocus
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
              //value={lastName}
              //onChange={(event) => onChangeHandler(event)}
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
              //  value={email}
              //onChange={(event) => //onChangeHandler(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="message"
                label="Message"
                type="message"
                id="message"
                multiline
                rows={5}
                rowsMax={20}
                autoComplete="current-password"
              //  value={password}
              />
            </Grid>
          </Grid>
          <div>
            <p></p>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          //className={classes.submit}
          // onClick={(event) =>
          //  createUserWithEmailAndPasswordHandler(event, email, password)
          //  }
          >
            Submit
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default withStyles(styles)(Contact);
