import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  ClickAwayListener,
  Typography,
} from "@material-ui/core";

import GoogleMaps from "lib/GoogleMaps";
import Property from "lib/Property";

import LabelValue from "./LabelValue";

const useStyles = makeStyles(() => ({
  detailCard: {
    width: 250,
    position: "absolute",
    left: 20,
    top: 20,
  },
  heading: {
    fontSize: "1rem",
  },
  streetImage: {
    width: "100%",
  },
}));

const PropertyDetails = ({ property, handleClose }) => {
  const classes = useStyles();
  const { lat, lon, satelliteImage, address, beds, baths, sqm, propertyType } =
    property;

  console.log("DETAILS");

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClose}>
      <Card className={classes.detailCard}>
        <CardContent>
          <Typography variant="h6" className={classes.heading}>
            Property Details
          </Typography>
          <a href={satelliteImage} target="_blank" rel="noopener noreferrer">
            <img
              src={GoogleMaps.getStreetViewImageURL(lat, lon)}
              className={classes.streetImage}
              alt={address}
            />
          </a>
          <LabelValue label="Price:" value={Property.getPrice(property)} />
          <LabelValue label="Address:" value={address ?? "n/a"} />
          <LabelValue label="Bedrooms:" value={beds ?? "n/a"} />
          <LabelValue label="Bathrooms:" value={baths ?? "n/a"} />
          <LabelValue label="SQM:" value={sqm ?? "n/a"} />
          <LabelValue
            label="Type:"
            value={Property.type[propertyType].label ?? "n/a"}
          />
        </CardContent>
      </Card>
    </ClickAwayListener>
  );
};

export default PropertyDetails;
