import React from "react";
import { withFeathersContext } from "../components/FeathersApp";

export default props => {
  const {
    app,
    service,
    initialized,
    connected,
    data,
    paginated,
    hasData,
    recordCount
  } = props;
  // console.log(`App: ${app && JSON.stringify(app)}`);

  return (
    <div data-testid="feathers-query-child">
      {app && <div data-testid="query-app-object" />}
      {service && <div data-testid={"query-service"}>{initialized}</div>}
      {connected && <div data-testid={"app-connected"}>{connected}</div>}
      {paginated && <div data-testid={"data-paginated"}>{connected}</div>}
      <div data-testid={"data-record-count"}>{recordCount}</div>

      {hasData && <div data-testid={"query-has-data"}>{hasData}</div>}
      {hasData && (
        <ul data-testid={"query-data"}>
          {data.map(item => (
            <li key={item.value}>{item.value}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
