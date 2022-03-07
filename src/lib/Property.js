import meanBy from "lodash/meanBy";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import range from "lodash/range";

const type = {
  APARTMENT: {
    label: "Apartment",
    key: "APARTMENT",
  },
  DETACHED: {
    label: "Detached",
    key: "DETACHED",
  },
  "SEMI-DETACHED": {
    label: "Semi-Detached",
    key: "SEMI-DETACHED",
  },
  TERRACED: {
    label: "Terraced",
    key: "TERRACED",
  },
};

const getCenterOfMap = (properties) => {
  if (!properties) return;
  return [meanBy(properties, "lat"), meanBy(properties, "lon")];
};

const getRange = (properties = [], key) => {
  return range(
    minBy(properties, key)?.[key] ?? 1,
    (maxBy(properties, key)?.[key] ?? 0) + 1
  );
};

const getBedroomRange = (properties) =>
  properties ? getRange(properties, "beds") : 0;
const getBathroomRange = (properties) =>
  properties ? getRange(properties, "baths") : 0;

const currencyFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

const getPrice = ({ price }) => {
  if (!price) {
    return "n/a";
  }
  const [formattedPrice] = currencyFormatter.format(price).split(".");
  return formattedPrice;
};

const filter = (properties, filterState) => {
  if (!properties) return [];
  const searchCriteria = Object.keys(filterState);
  return properties.filter((property) => {
    return searchCriteria.every((criteria) => {
      if (filterState[criteria] === "") {
        return true;
      }
      return filterState[criteria] === property[criteria];
    });
  });
};

export default {
  type,
  getCenterOfMap,
  getBedroomRange,
  getBathroomRange,
  getPrice,
  filter,
};
