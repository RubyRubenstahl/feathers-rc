import React from "react";
import FeathersApp from "../components/FeathersApp";
import FeathersQuery from "../components/FeathersQuery";
import FeathersQueryTest from "../test-components/FeathersQueryTest";
import testApp from "../../testApp/feathersTestApp";

import {
  render,
  waitForElement,
  cleanup,
  getByText
} from "react-testing-library";

const testData = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 }
];

const resetTestApp = async () => {
  const testService = testApp.service("test");
  testService.remove(null);
  const requests = testData.map(item => {
    testService.create(item);
  });
  await Promise.all(requests);
};

beforeEach(resetTestApp);
afterEach(cleanup);

test("<FeathersQuery/> with empty query", async () => {
  const { debug, getByTestId, queryByTestId } = render(
    <FeathersApp host={"localhost"} port={3030}>
      <FeathersQuery service={"test"} render={FeathersQueryTest} />
    </FeathersApp>
  );

  // Verify that the child component is rendered.
  expect(queryByTestId("feathers-query-child")).toBeTruthy();

  // Wait for the component to fully intitialize...
  await waitForElement(() => getByTestId("query-app-object"), {
    timeout: 2000
  });

  // Wait for the query to be returned
  await waitForElement(() => getByTestId("query-data"), {
    timeout: 2000
  });

  // Verify that the hasData was set to true when data was received
  expect(queryByTestId("query-has-data")).toBeTruthy();

  // Verify that recordCount is reporting the correct number of matches
  expect(queryByTestId("data-record-count").textContent).toBe(
    testData.length.toString()
  );

  //
});

test("<FeathersQuery/> with simple query", async () => {
  const { debug, getByTestId, queryByTestId } = render(
    <FeathersApp host={"localhost"} port={3030}>
      <FeathersQuery
        query={{ value: 1 }}
        service={"test"}
        render={FeathersQueryTest}
      />
    </FeathersApp>
  );

  // Wait for the query to be returned
  await waitForElement(() => getByTestId("query-data"), {
    timeout: 2000
  });

  // Verify that the hasData was set to true when data was received
  expect(queryByTestId("query-has-data")).toBeTruthy();

  // Verify that recordCount is reporting the correct number of matches
  expect(queryByTestId("data-record-count").textContent).toBe("1");

  // Verify that the correct item was received
  expect(queryByTestId("query-data").firstChild.textContent).toBe("1");
});
