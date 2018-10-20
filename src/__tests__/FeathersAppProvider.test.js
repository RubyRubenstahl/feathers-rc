import React from "react";
import FeathersAppProvider from "../components/FeathersAppProvider";
import FeathersAppProviderTest from "../test-components/FeathersAppProviderTest";
import {
  render,
  waitForElement,
  cleanup,
  getByText
} from "react-testing-library";

afterEach(cleanup);

test("<FeathersAppProvider/>", async () => {
  const { debug, getByTestId, queryByTestId } = render(
    <FeathersAppProvider>
      <FeathersAppProviderTest />
    </FeathersAppProvider>
  );
  // Verify that the child component is rendered.
  expect(getByTestId("feathers-app-child")).toBeTruthy();

  // Verify that the app is not reporting as initialized
  expect(queryByTestId("app-initialized")).toBeFalsy();

  // Verify that the app is not reporting as connected
  expect(queryByTestId("app-connected")).toBeFalsy();

  // Wait for the component to fully intitialize...
  await waitForElement(() => getByTestId("app-object"));

  // Verify that we are receiving an app object
  expect(getByTestId("app-object")).toBeTruthy();

  // Verify that the default host
  expect(getByTestId("websocket-host").textContent).toBe("localhost");

  // Verify the default port
  expect(getByTestId("websocket-port").textContent).toBe("80");

  // Verify that the app is reporting as initialized
  expect(queryByTestId("app-initialized")).toBeTruthy();

  // Verify that the app remains unconnected
  expect(queryByTestId("app-connected")).toBeFalsy();
});

test("<FeathersAppProvider/> with hostname and port", async () => {
  const HOST = "testhost";
  const PORT = 9001; // It's over 9000!!!!!
  const { debug, getByTestId, getByText } = render(
    <FeathersAppProvider host={HOST} port={PORT}>
      <FeathersAppProviderTest />
    </FeathersAppProvider>
  );

  await waitForElement(() => getByTestId("app-object"));
  // Verify that the child component is rendered.
  expect(getByTestId("feathers-app-child")).toBeTruthy();

  // Verify that we are receiving an app object
  expect(getByTestId("app-object")).toBeTruthy();

  // Verify that the host
  expect(getByTestId("websocket-host").textContent).toBe(HOST);

  // Verify the port
  expect(parseInt(getByTestId("websocket-port").textContent)).toBe(PORT);
});

test("<FeathersAppProvider/> with custom app", async () => {
  const HOST = "testhost";
  const PORT = 9001; // It's over 9000!!!!!
  const APP = {};
  const { debug, getByTestId, queryByTestId } = render(
    <FeathersAppProvider app={APP} host={HOST} port={PORT}>
      <FeathersAppProviderTest />
    </FeathersAppProvider>
  );

  await waitForElement(() => getByTestId("app-object"));
  // Verify that the child component is rendered.
  expect(getByTestId("feathers-app-child")).toBeTruthy();

  // Verify that we are receiving the app object
  expect(getByTestId("app-object")).toBeTruthy();

  // Verify that the host is ignored
  expect(queryByTestId("websocket-host")).toBeFalsy();

  // Verify the port is ignored
  expect(queryByTestId("websocket-port")).toBeFalsy();
});
