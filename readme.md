# Feathers React Components

[Feathers](https://feathersjs.com) is an elegant, flexible, and powerful nodejs backend API layer that is a pleasure to work with. Feathers React Components was created to leverage the app/service model that makes Feathers so easy to work with. 

Feathers React Components (FRC) is a set of components that make building Feathers frontends in React as delightful as building Feathers backends (in vanilla javascript, using the client library). 

## Awesome 🤘 Show me a contrived example!

```jsx
import React, { Component } from "react";
import { FeathersAppProvider, FeathersQuery } from "feathers-rc";
import TodoList from "./TodoList";

class App extends Component {
  render() {
    return (
      <FeathersAppProvider host={"localhost"} port={3030}>
        <FeathersQuery service={"todos"} query={{ complete: false }} realtime>
          {({ data }) => <TodoList todos={data} />}
        </FeathersQuery>
      </FeathersAppProvider>
    );
  }
}
export default App;
```
## 🙋 I have some questions!

### ❔ What is Feathers?

[Feathers](https://feathersjs.com) is a nodejs API layer that provides a standardized way to create REST and websocket (via socketio or primus) CRUD APIs that can be transparently be backed by a variety of storage solutions such as in-memory, browser localstorage, mongodb, most flavors of SQL, and more. 

A feathers app can easily be configured to provide realtime websocket events for CRUD transactions as well as allowing for custom events. 

This barely scratches the surface of what Feathers is. If you're not familiar, I'd strongly encourage you to learn a bit more about Feathers before you look at Feathers React Components. 

### 🎯 What does Feathers React Components do for me?

Feathers React Components allows you to consume Feathers APIs, including (optionally) automatic handling of realtime updates. 

All FRC components must be wrapped by a `<FeathersAppProvider>` component, which either accepts or creates a Feathers app instance. `<FeathersAppProvider>` uses the React Context API to provide the app to FRC components. 

`<FeathersAppProvider>` provides a reference to the app along with websocket connection status information. 

The `<FeathersGet>`, `<FeathersQuery>`, and `<FeathersFindOne>` (the query components) each recive a query and uses the render prop pattern to pass down fetch state, errors, and nomalized results along with a reference to the app. 

All of the query components have a boolean input prop called `realtime`, which enables realtime updates (see below for more). 

In addition to handling the queries, FRC also provides some nifty features to work with Feathers' pagination system. 

### 📜 It handles pagination too?! Please explain. 

Feathers gives you access to `limit` (number of records per page) and `skip` (index of the first returned record to show on the page). This gives you flexibility but leaves you to calculate page numbers and offsets yourself. 

FRC exposes both  `limit` and `skip` as props for consistency with the Feathers API. However, there are 2 additional props: `pageSize` and `pageIndex`. `pageSize` is essentially an friendely alias for `limit` while `pageIndex` will calculate the correct skip value based on the `pagSize`.

The component rendered by `<FeathersQuery>`, in addition to the results data, will receive several props describing the state of the pagination, such as `pageSize`, `pageIndex`, and `pageCount`. 

Loading another page can be acheived with the `load[next/previous/first/last]Page` functions passed as props the the children of a `<FeathersQuery>` compoonent. 

This should allow you to acheive effortless pagination. 

### 🔄 How do realtime updates work?

When a query component is mounted with the `realtime` prop set to `true`, it registers a listener for each of the Feathers service event types (`create`, `remove`, `update`, and `patch`). 

When a `create` or `remove` event is received, the query is simply re-executed as there's no way to know how the results of the query would be affected. 

When a `patch` or `update` event is received, the data stored within the query component's internal state updated to reflect the change. 

Listeners are automatically cleaned up when the component unmounts.

## ⚠️ !!!! IMPORTANT !!!!!

- Please note that this package is in early development and is **not production ready!!!**

- Some features are **not yet implemented**. 

- If you look at the current testing situation, you will be sad. 
  

## ⤵️ Installation

`npm install --save feathers-rc`

## 📦 Components

### \<FeathersAppProvider>

Uses the context api to provide access to the (???).
This component _must_ wrap all other `feathers-rc` components.

```jsx
<App>
  <FeathersAppProvider host={example.com} port={3030}>
    ... your secret sauce
  </FeathersAppProvider>
</App>
```

#### Input Props

| name | type                    | description                                                                                                                                         |
| ---- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| app  | _object_ (Feathers app) | (optional) If you need to customize your app, you can intialize it yourself and pass it in as a prop. If you do, the host and port will be ignored. |
| host | _string_                | Address of the host to connect to                                                                                                                   |
| port | _number_                | Websocket port for the host is listening on.                                                                                                        |

#### Passed Props

| name        | type      | description                                       |
| ----------- | --------- | ------------------------------------------------- |
| connected   | _boolean_ | True if the socketio connection is live           |
| app         | _object_  | Access the app directly when needed               |
| initialized | _boolean_ | True if initializtion of feathers app is complete |
| host        | _string_  | Host name of the feathers server.                 |
| port        | _number_  | Port number of the feathers server websocket.     |


### 📦 \<FeathersApp>

Passes the Feathers app and connection information into the rendered component.

```jsx
<FeathersAppProvider>host={"localhost"} port={3030}>
  <FeathersApp
    render={({ app, connected, host, port }) => (
      <ul>
        <li>connected: {Boolean(connected).toString()}</li>
        <li>host: {host}</li>
        <li>port: {port}</li>
      </ul>
    )}
  />
```

#### Input Props

None

#### Passed Props

| name       | type      | description                                                                                                          |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| connected  | _Boolean_ | Websocket connection status.                                                                                         |
| intialized | _Boolean_ | True when a preconfigured app was passed to `<FeathersAppProvider>` or the intialization of the default app is complete. |
| host       | _String_  | Host address of the Feathers server.                                                                                 |
| port       | _Number_  | Host port for the Feathers server.                                                                                   |

### 📦 \<FeathersQuery>

Fetches an arbitrary number of

```jsx
<FeathersAppProvider>host={"localhost"} port={3030}>
  <FeathersQuery
    service="test"
    query={{ roomId: 5 }}
    limit={10}
    skip={3}
    realtime
    render={({ recordCount }) => <div>Count: {recordCount}</div>}
  />
  <FeathersQuery />
</FeathersAppProvider>
```

#### Input Props

| name      | type       | description                                                                                                                                                                                                                                                                                                                      |
| --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| service   | _string_   | Name of the sevice to run the query on.                                  |
| query     | _number_   | A query to run on the service. The result will be passed to the _data_ prop (normalized for pagination). <br/><br/>The query is formatted as a [standard Feathers query](https://docs.feathersjs.com/api/databases/querying.html).                                                                                               |
| sort      | _number_   | An object in which the key is the data key to sort by, and the value is equal 1 for ascending or -1 for descending. ASC and DESC constants are exported from the library for your convenience. See the [sorting documentation](https://docs.feathersjs.com/api/databases/querying.html#sort) in the feathers docs for more info. |
| select    | _string_   | An array of strings containing the keys to include in the response data. If not specified, the entire document is returned.                                                                                                                                                                                                      |
| pageSize  | _number_   | The number of records per page when pagenating. **note** This prop will automatically calculate the value for `limit`. If both `pageSize` and `limit` are set, `limit` will take precedence. 
| pageIndex | _number_   | 0 based page number. **note** This prop will automatically calculate the value for `skip`. If both `pageIndex` and `skip` are set, `skip` will take precedence. 
| limit     | _number_   | Number of records per page. default = `0`.                                                                                                                                                                                                                                                                                         |
| skip      | _number_   | Number of records to skip. default = `10`.                                                                                                                                                                                                                                                                                          |
| realtime  | _boolean_  | If `true`, subscribe to changes and re-run the query if any changes are detected to the loaded queries.                                                                                                                                                                                                                            |
| transform | _function_ | Transformation function to run on data before it's passed down.                                                                                                                                                                                                                                                                  |

#### Passed Props

| name            | type                     | description                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app             | _object_                 | Access the app directly when needed.                                                                                                                                                                                                                                                                                                                   |
| service         | _object_                 | Direct access to the service the query was run on.                                                                                                                                                                                                                                                                                                    |
| data            | _array_ or _null_ 		 | The data returned from the query. <ul><li> Null if the query has not been returned or has no data. </li><li>Contains the data returned from the query.</li><li>Data will be normalized if paginated.</li><li>If a transform function was passed to the parent component, the data will have been processed by the transformation function.</li> </ul> |
| paginated       | _boolean_                | Indicates whether the response is paginated.                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                              |
| pageIndex       | _number_                 | Number of the current page of results.                                                                                                                                                                                                                                                                                                                |
| pageCount       | _number_                 | Number of pages available.                                                                                                                                                                                                                                                                                                                            |
| pageSize  	  | _number_   				 | The number of records per page when pagenate.  
| recordCount     | _number_                 | Total nunber or record found in the query. Null if the data is not included                                                                                                                                                                                                                                                                           |
| error           | [_Feathers Error_](https://github.com/feathersjs/errors)                 | Error object, if holding any error producted by the most recent request. Will be null if no error was reported.                                                                                                                                                                                                                                       |
| hasData         | _boolean_                | True if the normalized data is not null, empty array, or empty object                                                                                                                                                                                                                                                                                 |
| limit     	  | _number_   				 | Number of records per page.                                                                                                                                                                                                                                                                                      |
| skip      	  | _number_   				 | Number of records to skip.                                                                                                                                                                                                                                                                                           |
| fetching        | _boolean_                | True if there is currently a request in-flight.                                                                                                                                                                                                                                                                                                        |
| service         | _object_                 | Direct access to the service, should you need it.                                                                                                                                                                                                                                                                                                      |
| loadPrevPage()  | _function_               | Run the query for the prev page. Ignored if we are on the first page.                                                                                                                                                                                                                                                                                 |
| loadNextPage()  | _function_               | Run the query for the prev page. Ignored if we are on the first page.                                                                                                                                                                                                                                                                                 |
| laodFirstPage() | _function_               | Run the query for the first page.                                                                                                                                                                                                                                                                                                                     |
| loadLastPage()  | _function_               | Run the query for the last page.                                                                                                                                                                                                                                                                                                                      |
| loadPage(_number_ pageIndex)  |	_function_               | Run the query for the last page.                                                                                                                                                                                                                                                                                                                      |


### 📦 \<FeathersGet>

Fetches a single object by its `id`.

```jsx
<FeathersAppProvider host={"localhost"} port={3030}>
  <FeathersGet service={"my-service"} id={itemId} render={MyDataViewCompoonent} />
</FeathersAppProvider>
```

#### Input Props

| name    | type              | description                                                             |
| ------- | ----------------- | ----------------------------------------------------------------------- |
| service | _string_          | Name of the sevice to run the query on.                                  |
| id      | _string_          | Id of the resource to request.                                           |
| render  | _react component_ | The component or function to render. It will be passed the below props. |

#### Passed Props

| name        | type       | description                                                                                                                                                                                                                                                                                              |
| ----------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app         | _object_   | Direct access to the Feathers app, should you need it.                                                                                                                                                                                                                                                    |
| data        | _object_ or _null_  | The data returned from the query. <ul> <li> Null if the query has not been returned or has no data.</li><li> Contains the data returned from the query.</li><li> If a transform function was passed to the parent component, the data will have been processed by the transformation function.</li></ul> |
| error       | [_Feathers Error_](https://github.com/feathersjs/errors)                 | Error object, if holding any error producted by the most recent request. Will be null if no error was reported.                                                                                                                                                                                                                                       |
| fetching    | _boolean_  | `True` if there is currently a request in-flight.                                                                                                                                                                                                                                                           |
| hasData     | _boolean_  | `True` if the normalized data is not null, empty array, or empty object.                                                                                                                                                                                                                                    |
| service     | _object_   | Direct access to the service the query was run on.                                                                                                                                                                                                                                                       |
| transform   | _function_ | Transformation function to run on data before it's passed down.                                                                                                                                                                                                                                          |
# Exported Constants

```jsx
import { ASC, DESC } from "feathers-rc";
```

| name | value | description                                                            |
| ---- | ----- | ---------------------------------------------------------------------- |
| ASC  | 1     | Use with sort prop `<FeathersQuery>` to sort items in ascending order.  |
| DESC | -1    | Use with sort prop `<FeathersQuery>` to sort items in descending order. |

