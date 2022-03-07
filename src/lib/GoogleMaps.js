const mapsKey = process.env.REACT_APP_MAPS_KEY;

const getStreetViewImageURL = (lat, lon) => {
  return `https://maps.googleapis.com/maps/api/streetview?size=250x200&location=${lat},${lon}&fov=80&heading=70&pitch=0&key=${mapsKey}`;
};

export default {
  getStreetViewImageURL,
};
