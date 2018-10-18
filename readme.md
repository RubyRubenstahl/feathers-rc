# Feathers React Components

`feathers-rc` is a collection of React components designed to make building react apps backed by feathersjs a delightful experience.

`FeathersApp` acts as a root component, which provides access to the feathers app to other components contained within it.

`FeathersGet` and `FeathersQuery` allow you to declaritively query the server, passing data and other releavent data.

## IMPORTANT!

Please not that this package is in early development and is **not production ready!!!**

## A contrived example

```jsx
import React, { Component } from "react";
import { FeathersApp } from "feathers-rc";
import TodoList from "./TodoList";

class App extends Component {
  render() {
    return (
      <FeathersApp host={"localhost"} port={3030}>
        <FeathersQuery service={"todos"} query={{ complete: false }} realtime>
          {({ data }) => <TodoList todos={data} />}
        </FeathersQuery>
      </FeathersApp>
    );
  }
}

export default App;
```

## Installation

`npm install --save feathers-rc`

## Components

### \<FeathersApp>

Uses the context api to provide access to the.
This component _must_ wrap all other feathers-rc components.

```jsx
<App>
  <FeathersApp host={example.com} port={3030}>
    ... your secret sauce
  </FeathersApp>
</App>
```

#### Input Props

| name | type                    | description                                                                                                                                         |
| ---- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| app  | _object_ (feathers app) | (optional) If you need to customize your app, you can intialize it yourself and pass it in as a prop. If you do, the host and port will be ignored. |
| host | _string_                | Address of the host to connect to                                                                                                                   |
| port | _number_                | Websocket port for the host is listening on.                                                                                                        |

#### Child Props

| name        | type      | description                                       |
| ----------- | --------- | ------------------------------------------------- |
| connected   | _boolean_ | True if the socketio connection is live           |
| app         | _object_  | Access the app directly when needed               |
| initialized | _boolean_ | True if initializtion of feathers app is complete |
| host        | _string_  | Host name of the feathers server.                 |
| port        | _number_  | Port number of the feathers server websocket.     |

### \<FeathersAppInfo>

Passes the feathers app and connection information into the rendered component

```jsx
<FeathersApp host={"localhost"} port={3030}>
  <FeathersAppInfo
    render={({ app, connected, host, port }) => (
      <ul>
        <li>connected: {Boolean(connected).toString()</li>
        <li>host: {host}</li>
        <li>port: {port}</li>
      </ul>
    )}
  />
```

#### Input Props

None

#### Passed Props

| name       | type      | description                                                                                                 |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| connected  | _Boolean_ | Websocket connection status.                                                                                |
| intialized | _Boolean_ | True when a preconfigured appwas passed to FeathersApp or the intialization of the default app is complete. |
| host       | _Boolean_ | Host address of the feathers server.                                                                        |
| port       | _Boolean_ | Host port for the feathers server.                                                                          |

### \<FeathersQuery>

Fetches an arbitrary number of

```jsx
<FeathersApp host={"localhost"} port={3030}>
  <FeathersQuery
    service="test"
    query={{ roomId: 5 }}
    limit={10}
    skip={3}
    realtime
  >
    {({ recordCount }) => <div>Count: {recordCount}</div>}
  <FeathersQuery/>
</FeathersApp>
```

#### Props

| name      | type       | description                                                                                                                                                                                                                                                                                                                      |
| --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| query     | _number_   | A query to run on the service. The result will be passed to the _data_ prop (normalized for pagination). <br/><br/>The query is formatted as a [standard feathers query](https://docs.feathersjs.com/api/databases/querying.html).                                                                                               |
| sort      | _number_   | An object in which the key is the data key to sort by, and the value is equal 1 for ascending or -1 for descending. ASC and DESC constants are exported from the library for your convenience. See the [sorting documentation](https://docs.feathersjs.com/api/databases/querying.html#sort) in the feathers docs for more info. |
| select    | _string_   | An array of strings containing the keys to include in the response data. If not specified, the entire document is returned.                                                                                                                                                                                                      |
| limit     | _number_   | Number of records per page. default = 0                                                                                                                                                                                                                                                                                          |
| skip      | _number_   | Number of records to skip. default = 10                                                                                                                                                                                                                                                                                          |
| realtime  | _boolean_  | If true, subscribe to changes and re-run the query if any changes are detected to the loaded queries.                                                                                                                                                                                                                            |
| transform | _function_ | Transformation function to run on data before it's passed down.                                                                                                                                                                                                                                                                  |

#### Child Props

| name            | type                     | description                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app             | _object_                 | Access the app directly when needed                                                                                                                                                                                                                                                                                                                   |
| data            | _object, array, or null_ | The data returned from the query. <ul><li> Null if the query has not been returned or has no data. </li><li>Contains the data returned from the query.</li><li>Data will be normalized if paginated.</li><li>If a transform function was passed to the parent component, the data will have been processed by the transformation function.</li> </ul> |
| paginated       | _boolean_                | Indicates whether the response is paginated.                                                                                                                                                                                                                                                                                                          |
| pageCount       | _number_                 | Number of the current pages available.                                                                                                                                                                                                                                                                                                                |
| pageNum         | _number_                 | Number of the current page of results.                                                                                                                                                                                                                                                                                                                |
| pageCount       | _number_                 | Number of pages available.                                                                                                                                                                                                                                                                                                                            |
| startIndex      | _number_                 | Index of the first record within the query (the value passed to skip)                                                                                                                                                                                                                                                                                 |
| nextPageIndex   | _number_                 | The start index of the next page (use with skip). Null if no more pages available or pagination is disabled.                                                                                                                                                                                                                                          |
| prevPageIndex   | _number_                 | The start index of the previous page (use with skip). Null if no more pages available or pagination is disabled.                                                                                                                                                                                                                                      |
| recordCount     | _number_                 | Total nunber or record found in the query. Null if the data is not included                                                                                                                                                                                                                                                                           |
| service         | _object_                 | Direct access to the service the query was run on.                                                                                                                                                                                                                                                                                                    |
| error           | _object_                 | Error object, if holding any error producted by the most recent request. Will be null if no error was reported.                                                                                                                                                                                                                                       |
| - name          | _string_                 | Name of the error                                                                                                                                                                                                                                                                                                                                     |
| - message       | _string_                 | The error message.                                                                                                                                                                                                                                                                                                                                    |
| - code          | _number_                 | Error code                                                                                                                                                                                                                                                                                                                                            |
| - errors        | _object_                 | An abitrary object describing the errors, as passed by the service.                                                                                                                                                                                                                                                                                   |
| - data          | _object_                 | Any data that was provided with the request                                                                                                                                                                                                                                                                                                           |
| - classname     | _string_                 | CSS classname of the error , if it applicable.                                                                                                                                                                                                                                                                                                        |
| hasData         | _boolean_                | True if the normalized data is not null, empty array, or empty object                                                                                                                                                                                                                                                                                 |
| fetching        | _boolean_                | True if there is currently a request in-flight                                                                                                                                                                                                                                                                                                        |
| app             | _object_                 | Direct access to the feathers app, should you need it                                                                                                                                                                                                                                                                                                 |
| service         | _object_                 | Direct access to the service, should you need it                                                                                                                                                                                                                                                                                                      |
| name            | type                     | description                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ----------               | ---------------------------------------------------------------------                                                                                                                                                                                                                                                                                 |
| gotoNextPage()  | _function_               | Run the query for the next page. Ignored if we are on the last page.                                                                                                                                                                                                                                                                                  |
| gotoPrevPage()  | _function_               | Run the query for the prev page. Ignored if we are on the first page.                                                                                                                                                                                                                                                                                 |
| gotoFirstPage() | _function_               | Run the query for the first page;                                                                                                                                                                                                                                                                                                                     |
| gotoLastPage()  | _function_               | Run the query for the last page;                                                                                                                                                                                                                                                                                                                      |

### \<FeathersGet>

Fetches a single object by its id

```jsx
<FeathersApp host={"localhost"} port={3030}>
  <FeathersGet service="my-service" id={itemId} render={MyDataViewCompoonent} />
</FeathersApp>
```

#### Input Props

| name    | type              | description                                                             |
| ------- | ----------------- | ----------------------------------------------------------------------- |
| service | _string_          | Name of the sevice to run the query on                                  |
| id      | _string_          | Id of the resource to request                                           |
| render  | _react component_ | The component or function to render. It will be passed the below props. |

#### Passed Props

| name      | type       | description                                                                                                                                                                                                                                                                                              |
| --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app       | _object_   | Direct access to the feathers app, should you need it                                                                                                                                                                                                                                                    |
| data      | _object_   | The data returned from the query. <ul> <li> Null if the query has not been returned or has no data.</li><li> Contains the data returned from the query.</li><li> If a transform function was passed to the parent component, the data will have been processed by the transformation function.</li></ul> |
| error     | _object_   | Error object, if holding any error producted by the most recent request. Will be null if no error was reported.<ul><li> name                                                                                                                                                                             | _string_ | Name of the error</li><li> message | _string_ | The error message.</li><li> code | _number_ | Error code</li><li> errors | _object_ | An abitrary object describing the errors, as passed by the service.</li><li> data | _object_ | Any data that was provided with the request</li><li> classname | _string_ | CSS classname of the error , if it applicable.</li></ul> |
| fetching  | _boolean_  | True if there is currently a request in-flight                                                                                                                                                                                                                                                           |
| hasData   | _boolean_  | True if the normalized data is not null, empty array, or empty object                                                                                                                                                                                                                                    |
| service   | _object_   | Direct access to the service the query was run on.                                                                                                                                                                                                                                                       |
| transform | _function_ | Transformation function to run on data before it's passed down.                                                                                                                                                                                                                                          |

### \<FeathersService>

```jsx
<Service service={"service-name"}>
  <ChildComponent />
</Service>
```

#### Input Props

| name    | type              | description                                                             |
| ------- | ----------------- | ----------------------------------------------------------------------- |
| service | _string_          | Name of the service                                                     |
| render  | _react component_ | The component or function to render. It will be passed the below props. |

#### Passed Props

| name                     | type       | description                                                                                                                                                                                                                                   |
| ------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app                      | _object_   | Direct access to the feathers app, should you need it                                                                                                                                                                                         |
| service                  | _object_   | Direct access to the service, should you need it                                                                                                                                                                                              |
| create(data)             | _function_ | Create a new item on the service                                                                                                                                                                                                              |
| update(id, data, params) | _function_ | Replace the entire document(s) with the given id or query within the params object. <ul><li> Use null for id to update multiple items using a query.</li><li> Passing null to id without specifying a query will result in an error</li></ul> |
| patch(id, data, params)  | _function_ | Patch an existing object \* use null for id to update multiple items using a query object in the params object.                                                                                                                               |
| remove(id, params)       | _function_ | Remove the entire document(s) with the given id or query in the params object. <ul><li> Use null for id to update multiple items using a query.</li><li>Passing null to id without specifying a query will result in an error</li></ul>       |
| removeAll()              | _function_ | Remove all entries                                                                                                                                                                                                                            |

# Constants

| name | value | description                                                            |
| ---- | ----- | ---------------------------------------------------------------------- |
| ASC  | 1     | Use with sort prop `<FeathersQuery>` to sort items in ascending order  |
| DESC | -1    | Use with sort prop `<FeathersQuery>` to sort items in descending order |
