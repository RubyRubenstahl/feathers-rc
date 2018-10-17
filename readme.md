# Feathers React Components

`feathers-rc` is a collection of React components designed to make building react apps backed by feathersjs a delightful experience.

`FeathersApp` acts as a root component, which provides access to the feathers app to other components contained within it.

`FeathersGet` and `FeathersQuery` allow you to declaritively query the server, passing data and other releavent data.

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

## IMPORTANT!

Please not that this package is in early development and **is not production ready!!!**

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

**app** - (optional) If you need to customize your app, you can intialize it yourself and pass it in as a prop. If you do, the host and port will be ignored.

**host** - Address of the host to connect to

**port** - Websocket port for the host is listening on.

#### Child Properties

**connected** _\<boolean>_ - True if the socketio connection is live

**app** _\<object>_ - Access the app directly when needed

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

**connected** _\<Boolean>_ - Websocket connection status.

**intialized** _\<Boolean>_ - True when a preconfigured appwas passed to FeathersApp or the intialization of the default app is complete.

**host** _\<Boolean>_ - Host address of the feathers server.

**port** _\<Boolean>_ - Host port for the feathers server.

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

**query** _\<number>_ - A query to run on the service. The result will be passed to the _data_ prop (normalized for pagination).

The query is formatted as a [standard feathers query](https://docs.feathersjs.com/api/databases/querying.html).

**sort** _\<number>_ - An object in which the key is the data key to sort by, and the value is equal 1 for ascending or -1 for descending. ASC and DESC constants are exported from the library for your convenience. See the [sorting documentation](https://docs.feathersjs.com/api/databases/querying.html#sort) in the feathers docs for more info.

**select** _\<[string]>_ - An array of strings containing the keys to include in the response data. If not specified, the entire document is returned.

**limit** _\<number>_ - Number of records per page. default = 0

**skip** _\<number>_ - Number of records to skip. default = 10

**realtime** <boolean> - If true, subscribe to changes and re-run the query if any changes are detected to the loaded queries.

**transform** <function> - Transformation function to run on data before it's passed down.

#### Child Properties

**app** _\<object>_ - Access the app directly when needed

**data** <object, array, or null> - The data returned from the query.

- Null if the query has not been returned or has no data.
- Contains the data returned from the query.
- Data will be normalized if paginated.
- If a transform function was passed to the parent component, the data will have been processed by the transformation function.

**paginated** _\<boolean>_ - Indicates whether the response is paginated.

**pageCount** _\<number>_ - Number of the current pages available.

**pageNum** _\<number>_ - Number of the current page of results.

**pageCount** _\<number>_ - Number of pages available.

**startIndex** _\<number>_ - Index of the first record within the query (the value passed to skip)

**nextPageIndex** _\<number>_ - The start index of the next page (use with skip). Null if no more pages available or pagination is disabled.

**prevPageIndex** _\<number>_ - The start index of the previous page (use with skip). Null if no more pages available or pagination is disabled.

**recordCount** _\<number>_ - Total nunber or record found in the query. Null if the data is not included

**service** _\<object>_ - Direct access to the service the query was run on.

**error** _\<object>_ - Error object, if holding any error producted by the most recent request. Will be null if no error was reported.

- name _\<string>_ - Name of the error
- message _\<string>_ - The error message.
- code _\<number>_ - Error code
- errors _\<object>_ - An abitrary object describing the errors, as passed by the service.
- data _\<object>_ - Any data that was provided with the request
- classname _\<string>_ - CSS classname of the error , if it applicable.

**hasData** _\<boolean>_ - True if the normalized data is not null, empty array, or empty object

**fetching** _\<boolean>_ - True if there is currently a request in-flight

**app** _\<object>_ - Direct access to the feathers app, should you need it

**service** _\<object>_ - Direct access to the service, should you need it

#### Child Methods

**gotoNextPage()** _\<function>_ - Run the query for the next page. Ignored if we are on the last page.

**gotoPrevPage()** _\<function>_ - Run the query for the prev page. Ignored if we are on the first page.

**gotoFirstPage()** _\<function>_ - Run the query for the first page;

**gotoLastPage()** _\<function>_ - Run the query for the last page;

### \<FeathersGet>

Fetches a single object by its id

```jsx
<FeathersApp host={"localhost"} port={3030}>
  <FeathersGet service="my-service" id={itemId} render={MyDataViewCompoonent} />
</FeathersApp>
```

#### Input Props

**service** _\<string>_ - Name of the sevice to run the query on

**id** _\<string>_ - Id of the resource to request

**render** _\<funciton | component>_ - The component or function to render. It will be passed the below props.

#### Passed Props

**app** _\<object>_ - Direct access to the feathers app, should you need it

**data** _\<object>_ - The data returned from the query.

- Null if the query has not been returned or has no data.
- Contains the data returned from the query.
- If a transform function was passed to the parent component, the data will have been processed by the transformation function.

**error** _\<object>_ - Error object, if holding any error producted by the most recent request. Will be null if no error was reported.

- name _\<string>_ - Name of the error
- message _\<string>_ - The error message.
- code _\<number>_ - Error code
- errors _\<object>_ - An abitrary object describing the errors, as passed by the service.
- data _\<object>_ - Any data that was provided with the request
- classname _\<string>_ - CSS classname of the error , if it applicable.

**fetching** _\<boolean>_ - True if there is currently a request in-flight

**hasData** _\<boolean>_ - True if the normalized data is not null, empty array, or empty object

**service** _\<object>_ - Direct access to the service the query was run on.

**transform** _\<function>_ - Transformation function to run on data before it's passed down.

### \<FeathersService>

```jsx
<Service service={"service-name"}>
  <ChildComponent />
</Service>
```

#### Input Props

service _\<string>_ - Name of the service

**render** _\<funciton | component>_ - The component or function to render. It will be passed the below props.

#### Passed Props

**app** _\<object>_ - Direct access to the feathers app, should you need it

**service** _\<object>_ - Direct access to the service, should you need it

### Passed methods

**create(data)** - Create a new item on the service

**update(id, data, \<params>)** - Replace the entire document(s) with the given id or query within the params object.

- Use null for id to update multiple items using a query.
- Passing null to id without specifying a query will result in an error

**patch(id, data, \<params>)** - Patch an existing object \* use null for id to update multiple items using a query object in the params object.

**remove(id, \<params>)** - Remove the entire document(s) with the given id or query in the params object.
_ Use null for id to update multiple items using a query.
_ Passing null to id without specifying a query will result in an error

**removeAll()** - Remove all entries

# Constants

**ASC** = 1 -
Use with sort prop `<FeathersQuery>` to sort items in ascending order

**DESC** = -1 -
Use with sort prop `<FeathersQuery>` to sort items in descending order

## TBD

- Make change detection more efficient.
- Make sure change detection covers a reasonable range of use-cases
- Testing
- Configure webpack/babel, etc
