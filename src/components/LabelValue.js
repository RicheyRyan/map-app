import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 5,
  },
  label: {
    marginRight: 10,
  },
}));

const LabelValue = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.root}
    >
      <Typography variant="subtitle2" className={classes.label}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Grid>
  );
};

export default LabelValue;
