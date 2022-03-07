import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  Select as MUISelect,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200,
  },
}));

const Select = ({ children, labelId, id, label, value, onChange }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MUISelect
        labelId={labelId}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
      >
        {children}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
