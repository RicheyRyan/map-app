import { rest } from "msw";
import { setupServer } from "msw/node";
import { loadProperties } from "./properties";
import mockProperties from "mocks/properties";

describe("Properties API", () => {
  describe("loadProperties", () => {
    it("returns the expected response data", async () => {
      const server = setupServer(
        rest.get("/data.json", (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mockProperties));
        })
      );
      server.listen();
      const { error, data } = await loadProperties();

      expect(error).not.toBeDefined();
      expect(data).toBeDefined();
      expect(data.length).toBe(11);

      server.close();
    });
    it("transforms the object keys as expected", async () => {
      const server = setupServer(
        rest.get("/data.json", (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mockProperties));
        })
      );
      server.listen();
      const { data } = await loadProperties();
      const property = data[0];

      expect(property.propertyType).toBeDefined();
      expect(property.satelliteImage).toBeDefined();

      server.close();
    });
    it("returns an error as expected", async () => {
      const server = setupServer(
        rest.get("/data.json", (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({}));
        })
      );
      server.listen();
      const { error, data } = await loadProperties();

      expect(error).toBeDefined();
      expect(data).not.toBeDefined();

      server.close();
    });
  });
});
