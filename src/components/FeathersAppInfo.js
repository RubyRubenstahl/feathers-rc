import { withFeathersContext } from "./FeathersAppProvider";
import React from "react";
import propTypes from "prop-types";
import omit from "lodash/omit";

class FeathersAppInfo extends React.Component {
  render() {
    const props = omit(this.props, "render");
    return this.props.render ? this.props.render(props) : null;
  }
}

FeathersAppInfo.propTypes = {
  initialized: propTypes.bool.isRequired,
  connected: propTypes.bool.isRequired,
  host: propTypes.string,
  port: propTypes.number,
  app: propTypes.object,
  render: propTypes.func.isRequired
};

export default withFeathersContext(FeathersAppInfo);
