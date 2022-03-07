import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, MenuItem } from "@material-ui/core";
import map from "lodash/map";

import Property from "lib/Property";

import Select from "./Select";

const useStyles = makeStyles(() => ({
  filterMenu: {
    padding: "1em",
  },
}));

const FilterMenu = ({
  bedroomRange,
  bathroomRange,
  filterState,
  filterActions,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.filterMenu} justify="flex-start">
      <Grid item xs>
        <Select
          id="property-type"
          labelId="property-type-label"
          label="Property Type"
          value={filterState.propertyType}
          onChange={(e) => {
            filterActions.change("propertyType", e);
          }}
        >
          <MenuItem value="">No Selection</MenuItem>
          {map(Property.type, ({ label, key }) => (
            <MenuItem value={key} key={`property-type-${key}`}>
              <em>{label}</em>
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs>
        <Select
          id="bedrooms"
          labelId="bedroom-label"
          label="Bedrooms"
          value={filterState.beds}
          onChange={(e) => filterActions.change("beds", e)}
        >
          <MenuItem value="">No Selection</MenuItem>
          {map(bedroomRange, (value) => (
            <MenuItem value={value} key={`bedrooms-${value}`}>
              <em>{value}</em>
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs>
        <Select
          id="bathrooms"
          labelId="bathroom-label"
          label="Bathrooms"
          value={filterState.baths}
          onChange={(e) => filterActions.change("baths", e)}
        >
          <MenuItem value="">No Selection</MenuItem>
          {map(bathroomRange, (value) => (
            <MenuItem value={value} key={`bathroom-${value}`}>
              <em>{value}</em>
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default FilterMenu;
