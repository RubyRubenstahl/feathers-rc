import React from "react";
import propTypes from "prop-types";
import feathers from "@feathersjs/client";
import io from "socket.io-client";

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

export default class FeathersApp extends React.Component {
  state = {
    initialized: false,
    connected: false,
    host: "localhost",
    port: 80,
    app: null
  };

  async componentWillMount() {
    if (this.props.app) {
      await this.configureCustomApp();
    } else {
      this.configureDefaultApp();
    }
  }

  async configureDefaultApp() {
    const { host, port } = this.props;

    const feathersApp = await feathers();
    this.socket = io(`//${host}:${port}`);

    feathersApp.configure(feathers.socketio(this.socket));

    const normalizedPort = port || this.state.port;
    const normalizedHost = host || this.state.host;

    this.setState({
      host: normalizedHost,
      port: normalizedPort,
      app: feathersApp,
      initialized: true
    });
    
    this.socket.on('connect', ()=>{
      this.setState({connected:true});
    });
    
    this.socket.on('disconnect', ()=>{
      this.setState({connected:false});
    });
  }

  configureCustomApp() {
    this.setState({
      host: null,
      port: null,
      app: this.props.app
    });
  }

  render() {
    return (
      <FeathersAppContext.Provider value={this.state}>
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
