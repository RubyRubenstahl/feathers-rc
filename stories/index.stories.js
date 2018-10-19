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
} from "../src/index";
import { isArray } from "util";

storiesOf("Welcome", module)
  .add("FeathersQuery", () => (
    <FeathersApp host={"localhost"} port={3030}>
      <FeathersQuery
        service="test"
        query={{ id: { $gt: 10 } }}
        skip={8}
        limit={8}
        sort={{ id: ASC }}
        transform={data => data.map(item => ({ ...item, foo: "bar" }))}
        render={({
          recordCount,
          data,
          error,
          paginated,
          pageNum,
          pageCount,
          startIndex,
          nextPageIndex,
          prevPageIndex
        }) => (
            <div>
              {error && error.message}
              <br />
              Total Records: {recordCount}
              <br />
              Page count: {pageCount}
              <br />
              Current Page: {pageNum}
              <br />
              Start Index: {startIndex}
              <br />
              Next Page Index: {nextPageIndex}
              <br />
              Prev Page Index: {prevPageIndex}
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
  ;
