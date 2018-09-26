import React from "react";
import { render } from "react-testing-library";

import FeathersApp from "../components/FeathersApp";
const FeathersAppTest = ({}) => {
  return <div data-testid="feathers-app-child" />;
};
test("<FeathersApp/>", () => {
  const { debug, getByTestId } = render(
    <FeathersApp>
      <FeathersAppTest />
    </FeathersApp>
  );

  // Verify that the child component is rendered.
  expect(getByTestId("feathers-app-child")).toBeTruthy();
});
