import React from "react";
import { withFeathersContext } from "../components/FeathersApp";

export default withFeathersContext(props => {
  const { app, host, port, initialized, connected } = props;
  return (
    <div data-testid="feathers-app-child">
      {app && <div data-testid="app-object" />}
      {host && <div data-testid="websocket-host">{host}</div>}
      {port && <div data-testid={"websocket-port"}>{port}</div>}
      {initialized && <div data-testid={"app-initialized"}>{initialized}</div>}
      {connected && <div data-testid={"app-connected"}>{connected}</div>}
    </div>
  );
});
