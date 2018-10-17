import React from "react";
import propTypes from "prop-types";
import { withFeathersContext } from "./FeathersApp";
import isNil from "lodash/isNil";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import isFunction from "lodash/isFunction";
import isEqual from "lodash/isEqual";
import map from "lodash/map";
import mergeWith from "lodash/mergeWith";

import {
  getPageNum,
  getPageCount,
  getStartIndex,
  getNextPageIndex,
  getPrevPageIndex
} from "../helpers/pagination";

const replaceById = (a, b) => (a.id === b.id ? b : a);

class FeathersQuery extends React.Component {
  handlers = {};
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
    if (this.props.realtime && this.props.app) {
      this.configureEventHandlers();
    }
  }

  compenentWillUnmount() {
    this.cleanUpEventHandlers();
  }

  configureEventHandlers() {
    // Store the event handlers in an object so they can be easily accessed to cleanup.
    this.handlers = {
      created: data => this.onCreatedHandler(data),
      removed: data => this.onRemovedHandler(data),
      updated: data => this.onUpdatedHandler(data),
      patched: data => this.onPatchedHandler(data)
    };

    // Register the event handlers
    const service = this.props.app.service(this.props.service);
    map(this.handlers, (fn, eventName) => service.on(eventName, fn));
  }

  cleanUpEventHandlers() {
    console.log("Cleaning up event handlers on service " + this.props.service);
    const service = this.props.app.service(this.props.service);
    map(this.handlers, (fn, eventName) =>
      service.removeListener(eventName, fn)
    );
  }

  onCreatedHandler() {
    this.runQuery();
  }

  onRemovedHandler() {
    this.runQuery();
  }

  onUpdatedHandler(data) {
    const newData = map(this.state.data, currentItem =>
      replaceById(newData, data)
    );
    this.setState({ data: newData });
  }

  onPatchedHandler(data) {
    const newData = map(this.state.data, currentItem =>
      replaceById(newData, data)
    );
    this.setState({ data: newData });
  }

  componentDidUpdate(prevProps) {
    // Run the query if the query has changed
    // or we've just received an app for the first time.
    if (
      !isEqual(this.props.query, prevProps.query) ||
      (!prevProps.app && this.props.app)
    ) {
      if (this.props.realtime) {
        this.configureEventHandlers();
      }
      this.runQuery();
    }
  }

  async runQuery() {
    this.setState({ fetching: true, error: false });
    // console.log("Running query");
    try {
      const {
        query,
        service,
        sort,
        select,
        page,
        limit = 10,
        skip = 0,
        app
      } = this.props;

      const params = { query: query || {} };
      if (sort) {
        params.query.$sort = sort;
      }

      if (limit) {
        params.query.$limit = limit;
      }

      if (page !== undefined) {
        params.query.$skip = page * limit;
      }

      if (skip !== undefined) {
        params.query.$skip = skip;
      }

      if (select) {
        params.query.$select = select;
      }

      const result = await app.service(service).find(params);
      // console.log("Query complete");
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
        paginated: true,
        pageCount: getPageCount(result),
        pageNum: getPageNum(result),
        nextPageIndex: getNextPageIndex(result),
        prevPageIndex: getPrevPageIndex(result),
        startIndex: getStartIndex(result),
        recordCount: result.total
      });
    }

    if (isNil(result)) {
      this.setState({
        data: null,
        error: null,
        fetching: false,
        hasData: false,
        paginated: true,
        pageCount: null,
        pageNum: null,
        nextPageIndex: null,
        prevPageIndex: null,
        startIndex: null,
        recordCount: 0
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
  app: propTypes.object,
  service: propTypes.string.isRequired,
  sort: propTypes.number,
  select: propTypes.arrayOf(propTypes.string),
  limit: propTypes.number,
  skip: propTypes.number,
  disablePagination: propTypes.bool,
  realtime: propTypes.bool,
  transform: propTypes.func
};

export default withFeathersContext(FeathersQuery);
