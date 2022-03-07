import GoogleMaps from "./GoogleMaps";

describe("GoogleMaps", () => {
  describe("getStreetViewImageURL", () => {
    it("returns the expected street view url", () => {
      expect(GoogleMaps.getStreetViewImageURL(24, 34)).toMatch(
        new RegExp(
          /https:\/\/maps\.googleapis\.com\/maps\/api\/streetview\?size=250x200&location=24,34&fov=80&heading=70&pitch=0&key=*.+/
        )
      );
    });
  });
});
