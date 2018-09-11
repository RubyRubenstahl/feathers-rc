import React from "react";
import { shallow, mount, render } from "enzyme";

import FeathersApp from "./FeathersApp";

describe("<FeathersApp/>", () => {
  test("renders children when passed in", () => {
    const wrapper = shallow(
      <FeathersApp>
        <div className="unique" />
      </FeathersApp>
    );
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });
});
