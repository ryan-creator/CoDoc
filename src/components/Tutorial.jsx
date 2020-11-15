import React from "react";
import {
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";

const styles = (theme) =>
  createStyles({
    text: {
      textAlign: 'center',
      marginTop: '200px',
    }
  });

function Tutorial(props) {
  const { classes } = props;

  return (
    <Box className={classes.text}>
      <Typography>
        This is the Tutorial Tab
      </Typography>
    </Box>
  );
}

export default withStyles(styles)(Tutorial);
