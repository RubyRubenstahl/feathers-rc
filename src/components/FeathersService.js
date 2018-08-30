import React from "react";
import propTypes from "prop-types";
import { withFeathersContext } from "./FeathersApp";

class FeathersService extends React.Component {
  render() {
    const service = this.props.app.service(this.props.name);

    return this.props.render
      ? this.props.render({
          app: this.props.app,
          service,
          create: data => service.create(data),
          update: (id, data, query) => service.update(id, data, { query }),
          patch: (id, data, query) => service.patch(id, data, { query }),
          remove: (id, query) => service.remove(id, { query }),
          removeAll: () => service.remove(null)
        })
      : null;
  }
}

FeathersService.propTypes = {
  app: propTypes.object.isRequired,
  name: propTypes.string.isRequired
};

export default withFeathersContext(FeathersService);
