import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        //marginLeft: theme.spacing(2),
        alignItems: "centre"
      },
    },
  }),
);

export default function CircularDeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container alignContent="center" direction="column">            
        <CircularProgress style={{marginTop: '20%'}}/>
        </Grid>
    </div>
  );
}

