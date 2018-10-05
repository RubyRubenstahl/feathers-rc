import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs"
  },
  external: [
    "react",
    "react-dom",
    "@babel/polyfill",
    "prop-types",
    "@feathersjs/client",
    "socket.io-client"
  ],
  plugins: [
    resolve({ esnext: true }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      exclude: ["node_modules/lodashs/**"]
    })
  ]
};
