import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { FeathersApp, FeathersQuery, ASC, DESC } from "../src/index";

storiesOf("Welcome", module).add("to Storybook", () => (
  <FeathersApp host={"localhost"} port={3030}>
    <FeathersQuery
      service="test"
      query={{ id: { $gt: 10 } }}
      skip={0}
      limit={8}
      sort={{ id: ASC }}
      // select={["test"]}
      disablePagination
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
));
