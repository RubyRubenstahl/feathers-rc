import React from "react";
import propTypes from "prop-types";
import { withFeathersContext } from "./FeathersApp";
import isNil from "lodash.isnil";
import isArray from "lodash.isarray";
import isObject from "lodash.isobject";
import isFunction from "lodash.isfunction";
import isEqual from "lodash.isequal";

class FeathersQuery extends React.Component {
  state = {
    data: null,
    error: null,
    fetching: false,
    hasData: false,
    nextpage: null,
    paginated: null,
    prevPage: null,
    recordCount: null,
    startIndex: null
  };

  componentDidMount() {
    if (this.props.app) {
      this.runQuery();
    }
    if (this.props.liveUpdate && this.props.app) {
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

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.query, prevProps.query)) {
      this.runQuery();
    }
  }

  async runQuery() {
    this.setState({ fetching: true, error: false });
    console.log("Running query");
    try {
      const { query, service, sort, select, limit, skip, app } = this.props;

      const params = { query: query || {} };
      if (sort) {
        params.query.$sort = sort;
      }

      if (limit) {
        params.query.$limit = limit;
      }

      if (skip) {
        params.query.$skip = skip;
      }

      if (select) {
        params.query.$select = select;
      }

      const result = await app.service(service).find(params);
      console.log("Query complete");
      this.processQueryResult(result);
    } catch (e) {
      this.setState({ error: e, fetching: false });
    }
  }

  processQueryResult(result) {
    // Not paginated
    if (isArray(result)) {
      this.setState({
        data: isFunction(this.props.transform)
          ? this.props.transform(result)
          : result,
        error: null,
        fetching: false,
        hasData: true,
        nextpage: null,
        paginated: false,
        prevPage: null,
        recordCount: result.length,
        startIndex: null
      });
    }

    // Paginated
    if (isObject(result)) {
      this.setState({
        data: isFunction(this.props.transform)
          ? this.props.transform(result.data)
          : result.data,
        error: null,
        fetching: false,
        hasData: true,
        nextpage: null,
        paginated: true,
        prevPage: null,
        recordCount: result.total,
        startIndex: null
      });
    }

    if (isNil(result)) {
      this.setState({
        data: null,
        error: null,
        fetching: false,
        hasData: false,
        nextpage: null,
        paginated: false,
        prevPage: null,
        recordCount: 0,
        startIndex: null
      });
    }
  }

  render() {
    const service =
      this.props.app && this.props.app.service(this.props.service);
    return this.props.render
      ? this.props.render({ ...this.props, ...this.state, service })
      : null;
  }
}

FeathersQuery.propTypes = {
  query: propTypes.object,
  app: propTypes.object.isRequired,
  service: propTypes.string.isRequired,
  sort: propTypes.number,
  select: propTypes.arrayOf(propTypes.string),
  limit: propTypes.number,
  skip: propTypes.number,
  disablePagination: propTypes.bool,
  liveUpdate: propTypes.bool,
  transform: propTypes.func,
  render: propTypes.func
};

export default withFeathersContext(FeathersQuery);
