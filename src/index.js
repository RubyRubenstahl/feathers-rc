import "@babel/polyfill";

import React from "react";
import FeathersAppProvider from "./components/FeathersAppProvider";
import FeathersQuery from "./components/FeathersQuery";
import FeathersGet from "./components/FeathersGet";
import FeathersAppInfo from "./components/FeathersAppInfo";

const ASC = 1;
const DESC = -1;

export {
  FeathersAppProvider,
  FeathersQuery,
  FeathersGet,
  FeathersAppInfo,
  ASC,
  DESC
};
