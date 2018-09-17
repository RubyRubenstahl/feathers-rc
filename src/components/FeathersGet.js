import React from "react";
import propTypes from "prop-types";
import { withFeathersContext } from "./FeathersApp";
import isNil from "lodash.isnil";
import isArray from "lodash.isarray";
import isObject from "lodash.isobject";
import isFunction from "lodash.isfunction";
import isEqual from "lodash.isequal";

class FeathersGet extends React.Component {
  state = {
    data: null,
    error: null,
    fetching: false,
    hasData: false
  };

  componentDidMount() {
    if (this.props.app) {
      this.runQuery();
    }
    if (this.props.realtime && this.props.app) {
      this.configureListeners();
    }
  }

  configureListeners() {
    console.log("Configuring listener on service " + this.props.service);
    const service = this.props.app.service(this.props.service);

    service.on("created", () => this.runQuery());
    service.on("removed", () => this.runQuery());
    service.on("updated", () => this.runQuery());
    service.on("patched", () => this.runQuery());
  }

  async runQuery() {
    this.setState({ fetching: true, error: false });
    console.log("Running get");
    try {
      const { service, select, app } = this.props;

      const params = { query: {} };
      if (select) {
        params.query.$select = select;
      }

      const result = await app.service(service).get(this.props.id, params);
      console.log("Query complete");
      this.processQueryResult(result);
    } catch (e) {
      console.error("Feathers query failed: " + e.message);
      this.setState({ error: e, fetching: false });
    }
  }

  processQueryResult(result) {
    this.setState({
      data: this.props.transform ? this.props.transform(result) : result,
      error: null,
      fetching: false,
      hasData: true
    });
  }

  render() {
    return this.props.render
      ? this.props.render({ ...this.props, ...this.state })
      : null;
  }
}

FeathersGet.propTypes = {
  query: propTypes.object,
  app: propTypes.object.isRequired,
  service: propTypes.string.isRequired,
  sort: propTypes.number,
  select: propTypes.arrayOf(propTypes.string),
  limit: propTypes.number,
  skip: propTypes.number,
  disablePagination: propTypes.bool,
  realtime: propTypes.bool,
  transform: propTypes.func
};

export default withFeathersContext(FeathersGet);
