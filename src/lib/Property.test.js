import Property from "./Property";
import mockedProperties from "mocks/properties";

describe("Property", () => {
  describe("getCenterOfMap", () => {
    it("returns the expected centered lat and long", () => {
      expect(Property.getCenterOfMap(mockedProperties)).toStrictEqual([
        53.253412000000004,
        -6.129385363636363,
      ]);
    });
  });
  describe("getBathroomRange", () => {
    it("returns the expected range for bathrooms", () => {
    expect(Property.getBathroomRange(mockedProperties)).toStrictEqual([1, 2]);
    });
  });
  describe("getBedroomRange", () => {
    it("returns the expected range for bathrooms", () => {
      expect(Property.getBedroomRange(mockedProperties)).toStrictEqual([
        1,
        2,
        3,
        4,
      ]);
    });
  });
  describe("getPrice", () => {
    it("returns the price in the expected format", () => {
      expect(Property.getPrice({ price: 234560 })).toEqual("€234,560");
    });
    it("returns the expected default if the price is absent", () => {
      expect(Property.getPrice({ price: null })).toEqual("n/a");
    });
  });
  describe("filter", () => {
    const filtered = Property.filter(mockedProperties, {
      propertyType: "DETACHED",
      beds: 2,
      baths: 1,
    });

    expect(filtered.length).toBe(1);
    filtered.forEach((property) => {
      expect(property.propertyType).toBe("DETACHED");
      expect(property.beds).toBe(2);
      expect(property.baths).toBe(1);
    });
  });
});
