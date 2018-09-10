import React from "react";
import propTypes from "prop-types";
const feathers = require("@feathersjs/feathers");
const socketio = require("@feathersjs/socketio-client");
const io = require("socket.io-client");

const FeathersAppContext = React.createContext();

export const withFeathersContext = Component => {
  return props => (
    <FeathersAppContext.Consumer>
      {context => {
        return <Component {...props} {...context} />;
      }}
    </FeathersAppContext.Consumer>
  );
};

export class FeathersApp extends React.Component {
  state = {
    initialized: false,
    connected: false
  };

  componentWillMount() {
    const { host = "localhost", port = 80, app } = this.props;

    if (app) {
      this.app = app;
    } else {
      this.socket = io(`//${host}:${port}`);
      this.app = feathers();
      this.app.configure(socketio(this.socket));
    }
  }

  render() {
    return (
      <FeathersAppContext.Provider value={{ ...this.state, app: this.app }}>
        {this.props.children}
      </FeathersAppContext.Provider>
    );
  }
}

FeathersApp.propTypes = {
  host: propTypes.string,
  port: propTypes.number,
  app: propTypes.object
};
