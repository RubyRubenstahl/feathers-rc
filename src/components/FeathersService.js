import React from "react";
import propTypes from "prop-types";
import { withFeathersContext } from "./FeathersApp";

class FeathersService extends React.Component {
  render() {
    const service = this.props.app.service(this.props.service);

    return this.props.render
      ? this.props.render({
          app: this.props.app,
          service,
          create: data => service.create(data),
          update: (id, data, params) => service.update(id, data, params),
          patch: (id, data, params) => service.patch(id, data, params),
          remove: (id, query) => service.remove(id, { query }),
          removeAll: () => service.remove(null)
        })
      : null;
  }
}

FeathersService.propTypes = {
  app: propTypes.object.isRequired,
  service: propTypes.string.isRequired
};

export default withFeathersContext(FeathersService);
