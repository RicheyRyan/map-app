import camelCase from "lodash/camelCase";
import mapKeys from "lodash/mapKeys";

const formatPropertyKeys = (json) =>
  json.map((property) => mapKeys(property, (value, key) => camelCase(key)));

export const loadProperties = async () => {
  let error, data;

  try {
    const response = await fetch("/data.json");
    const json = await response.json();
    data = formatPropertyKeys(json);
  } catch (e) {
    error = e;
  }

  return { error, data };
};
