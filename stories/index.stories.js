import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import {
  FeathersApp,
  FeathersQuery,
  FeathersGet,
  ASC,
  DESC,
  FeathersService
} from "../src/index";
import { isArray } from "util";

storiesOf("Welcome", module)
  .add("FeathersQuery", () => (
    <FeathersApp host={"localhost"} port={3030}>
      <FeathersQuery
        service="test"
        query={{ id: { $gt: 10 } }}
        skip={0}
        limit={8}
        sort={{ id: ASC }}
        transform={data => data.map(item => ({ ...item, foo: "bar" }))}
        render={({ recordCount, data, error, paginated }) => (
          <div>
            {error && error.message}
            <br />
            Total Records: {recordCount}
            <br />
            Paginated: {JSON.stringify(paginated)}
            <br />
            data: <pre>{JSON.stringify(data, null, 2)} </pre>
          </div>
        )}
        liveUpdate
      />
    </FeathersApp>
  ))
  .add("FeathersGet", () => (
    <FeathersApp host={"localhost"} port={3030}>
      <FeathersGet
        service="test"
        id={15}
        transform={data => ({ ...data, foo: "bar" })}
        render={({ data, error }) => (
          <div>
            {error && error.message}
            <br />
            data: <pre>{JSON.stringify(data, null, 2)} </pre>
          </div>
        )}
        liveUpdate
      />
    </FeathersApp>
  ))
  .add("FeathersService", () => (
    <FeathersApp host={"localhost"} port={3030}>
      <FeathersQuery
        service={"test"}
        limit={1}
        liveUpdate
        render={({ recordCount = 0, error, data }) => (
          <React.Fragment>
            <div>
              {error && error.message}
              <br />
              Total Records: {recordCount}
              <br />
              FirstRecord:
              <pre>{isArray(data) && JSON.stringify(data[0], null, 2)} </pre>
            </div>

            <FeathersService
              name={"test"}
              render={({ create, removeAll, patch }) => {
                return (
                  <React.Fragment>
                    <button onClick={() => create({ timestamp: Date.now() })}>
                      +
                    </button>

                    <button onClick={removeAll}>Clear</button>
                    {isArray(data) && (
                      <button
                        onClick={() =>
                          patch(data[0].id, { timestamp: Date.now() })
                        }
                      >
                        Patch
                      </button>
                    )}
                  </React.Fragment>
                );
              }}
            />
          </React.Fragment>
        )}
      />
    </FeathersApp>
  ));
