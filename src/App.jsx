import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Grid,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import useAsync, { state } from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import { loadProperties } from "api/properties";
import Property from "lib/Property";

import Topbar from "components/Topbar";
import FilterMenu from "components/FilterMenu";
import PropertyDetails from "components/PropertyDetails";
import GoogleMap, { MapMarker } from "components/GoogleMap";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    height: "100vh",
  },
  paper: {
    height: `calc(100vh - ${theme.topbar.height}px)`,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
}));

const App = () => {
  const classes = useStyles();
  const { status, data, error } = useAsync({
    asyncFn: loadProperties,
  });
  const { filterState, filterActions } = useFilter({
    beds: "",
    baths: "",
    propertyType: "",
  });

  const [selectedProperty, setSelectedProperty] = useState(-1);

  const center = Property.getCenterOfMap(data);
  const bedroomRange = Property.getBedroomRange(data);
  const bathroomRange = Property.getBathroomRange(data);
  const filteredProperties = Property.filter(data, filterState);

  return (
    <>
      <CssBaseline />
      <Grid className={classes.appContainer}>
        <Topbar />
        <Grid
          component={Paper}
          container
          direction="column"
          className={classes.paper}
        >
          <Grid>
            <FilterMenu
              bedroomRange={bedroomRange}
              bathroomRange={bathroomRange}
              filterActions={filterActions}
              filterState={filterState}
            />
          </Grid>
          <Grid
            container
            className={classes.mapContainer}
            justify="center"
            alignContent="center"
          >
            {status === state.loading && (
              <CircularProgress aria-label="loading" />
            )}
            {status === state.complete && !error && (
              <>
                <GoogleMap center={center}>
                  {filteredProperties.map(({ address, lat, lon }, i) => (
                    <MapMarker lat={lat} lng={lon} key={address}>
                      <IconButton
                        aria-label="property"
                        onClick={() => {
                          setSelectedProperty(i);
                        }}
                      >
                        <HomeIcon color="primary" />
                      </IconButton>
                    </MapMarker>
                  ))}
                </GoogleMap>
                {selectedProperty > 0 && (
                  <PropertyDetails
                    property={filteredProperties[selectedProperty]}
                    handleClose={() => setSelectedProperty(-1)}
                  />
                )}
              </>
            )}
            {status === state.complete && error && (
              <Typography>
                We had trouble loading the properties, please try reloading
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
