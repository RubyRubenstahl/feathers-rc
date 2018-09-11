import React from "react";
import { shallow, mount, render } from "enzyme";

import { FeathersApp } from "../";

describe("<FeathersApp/>", () => {
  const defaultFeathersApp = mount(
    <FeathersApp>
      <div className="unique" />
    </FeathersApp>
  );

  test("renders children when passed in", () => {
    expect(defaultFeathersApp.contains(<div className="unique" />)).toBe(true);
  });

  test("Creates and passes a feathers app", () => {
    expect(defaultFeathersApp.props("app")).toBeDefined();
  });
});
