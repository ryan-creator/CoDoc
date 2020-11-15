// import React from "react";
// import {
//   createStyles,
//   withStyles,
// } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box/Box";
// import TextField from "@material-ui/core/TextField";

// // const styles = (theme) =>
// //   createStyles({
// //     text: {
// //       textAlign: 'center',
// //       marginTop: '200px',
// //     }
// //   });
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

// function About() {
//   //const { classes } = props;

//   return (
//     <div>
//       {/* <Box className={classes.text}> */}
//       <Typography>
//         <h1>About Us</h1>
//         <TextField
//           variant="outlined"
//           required
//           fullWidth
//           name="CoDoc"
//           label="CoDoc"
//           type="CoDoc"
//           id="CoDoc"
//           multiline
//           rows={5}
//           rowsMax={20}
//         />
//         <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//         <TextField
//           id="standard-multiline-flexible"
//           label="Multiline"
//           multiline
//           rowsMax={4}
//           value={value}
//           onChange={handleChange}
//         />
//         <Grid
//           container
//           direction="column"
//           justify="center"
//           alignItems="center"
//         >
//           <Paper className={classes.paper}>
//             CoDoc is a collaborative student workspace designed to incorporate all aspects of learning in one place. It was designed and is maintained by students from Otago University.
//            </Paper>
//         </Grid>
//       </Typography>
//       {/* </Box> */}
//     </div>
//   );
// }
// export default (About);



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "100px"
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AboutContent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Description</h1>
          <Paper className={classes.paper}>
            CoDoc is a collaborative student workspace designed to incorporate all aspects of learning in one place. It was designed and is maintained by students from Otago University
            </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

// export default withStyles(styles)(About);

// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';


// export default function AboutContent(props) {

//   return (
//     <Grid item xs={12} md={8}>
//       <Typography variant="h6" gutterBottom>
//         {title}
//       </Typography>
//     </Grid>
//   );
// }
