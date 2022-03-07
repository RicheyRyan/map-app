import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import mockProperties from "mocks/properties";

jest.mock(
  "google-map-react",
  () =>
    ({ children }) =>
      children
);

const theme = createMuiTheme({
  topbar: { height: 64 },
});

describe("Map App", () => {
  it("renders ok", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
    getByText(/Map App/i);
  });

  it("renders all the home icons", async () => {
    const server = setupServer(
      rest.get("/data.json", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProperties));
      })
    );
    server.listen();
    const { getByLabelText, findAllByLabelText } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
    getByLabelText("loading");
    const properties = await findAllByLabelText("property");
    expect(properties.length).toBe(11);
    server.close();
  });

  it("updates the number of home icons based on the filters", async () => {
    const server = setupServer(
      rest.get("/data.json", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProperties));
      })
    );
    server.listen();
    const {
      findAllByLabelText,
      getByLabelText,
      getAllByLabelText,
      getByText,
      getAllByText,
      queryAllByLabelText,
    } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
    let properties = await findAllByLabelText("property");
    expect(properties.length).toBe(11);
    const propertyTypeFilter = getByLabelText("Property Type");
    const bedroomsFilter = getByLabelText("Bedrooms");
    const bathroomsFilter = getByLabelText("Bathrooms");

    fireEvent.mouseDown(propertyTypeFilter);
    const detachedOption = await waitFor(() => getByText("Detached"));
    fireEvent.click(detachedOption);
    await waitForElementToBeRemoved(() => getByText("No Selection"));

    properties = getAllByLabelText("property");
    expect(properties.length).toBe(2);

    fireEvent.mouseDown(bedroomsFilter);
    const twoBedOption = await waitFor(() => getByText("2"));
    fireEvent.click(twoBedOption);
    await waitForElementToBeRemoved(() => getByText("No Selection"));

    properties = getAllByLabelText("property");
    expect(properties.length).toBe(1);

    fireEvent.mouseDown(bathroomsFilter);
    const oneBathOption = await waitFor(() => getByText("1"));
    fireEvent.click(oneBathOption);
    await waitForElementToBeRemoved(() => getByText("No Selection"));

    properties = getAllByLabelText("property");
    expect(properties.length).toBe(1);

    fireEvent.mouseDown(bathroomsFilter);
    const twoBathOption = await waitFor(() => getAllByText("2"));
    fireEvent.click(twoBathOption[1]);
    await waitForElementToBeRemoved(() => getByText("No Selection"));

    properties = queryAllByLabelText("property");
    expect(properties.length).toBe(0);

    server.close();
  });

  it("renders an error if the API does not return successfully", async () => {
    const server = setupServer(
      rest.get("/data.json", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: "500" }));
      })
    );
    server.listen();
    const { getByLabelText, findByText } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
    getByLabelText("loading");
    await findByText(
      "We had trouble loading the properties, please try reloading"
    );
    server.close();
  });
});
