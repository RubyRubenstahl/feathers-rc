# Feathers React Components

## Installation

`npm install --save feathers-rc`

## Components

### \<FeathersApp>

Uses the context api to provide access to the.
This component _must_ wrap all other feathers-rc components.

```jsx
<FeathersApp host={example.com} port={3030}>
  <ChildComponent />
</FeathersApp>
```

#### Props

**host** - Address of the host to connect to

**port** - Websocket port for the host is listening on.

#### Child Properties

**connected** _\<boolean>_ - True if the socketio connection is live

**app** _\<object>_ - Access the app directly when needed

### \<FeathersQuery>

Fetches an arbitrary number of

```jsx
<FeathersQuery
  service={"service-name"}
  query={{ roomId: 5 }}
  limit={10}
  skip={3}
  liveUpdate={true}
>
  <ChildComponent />
</FeathersQuery>
```

#### Props

**query** _\<number>_ - A query to run on the service. The result will be passed to the _data_ prop (normalized for pagination).

The query is formatted as a [standard feathers query](https://docs.feathersjs.com/api/databases/querying.html).

**sort** _\<object>_ - An object in which the key is the data key to sort by, and the value is equal 1 for ascending or -1 for descending. ASC and DESC constants are exported from the library for your convenience. See the [sorting documentation](https://docs.feathersjs.com/api/databases/querying.html#sort) in the feathers docs for more info.

**select** _\<[string]>_ - An array of strings containing the keys to include in the response data. If not specified, the entire document is returned.

**limit** _\<number>_ - Number of records per page

**skip** _\<number>_ - Number of records to skip

**disablePagination** _\<boolean>_- Kind of speaks for itself...

**liveUpdate** <boolean> - If true, subscribe to changes and re-run the query if any changes are detected to the loaded queries.

**transform** <function> - Transformation function to run on data before it's passed down.

#### Child Properties

**data** <object, array, or null> - The data returned from the query.

- Null if the query has not been returned or has no data.
- Contains the data returned from the query.
- Data will be normalized if paginated.
- If a transform function was passed to the parent component, the data will have been processed by the transformation function.

**paginated** _\<boolean>_ - Indicates whether the response is paginated.

**startIndex** _\<number>_ - Index of the first record within the query (the value passed to skip)

**nextPage** _\<number>_ - The start index of the next page (use with skip). Null if no more pages available or pagination is disabled.

**prevPage** _\<number>_ - The start index of the previous page (use with skip). Null if no more pages available or pagination is disabled.

**recordCount** _\<number>_ - Total nunber or record found in the query. Null if the data is not included

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

---

### \<FeathersGet>

Fetches a single object by its id

```jsx
<FeathersGet service={"my-service"} id={objId}>
  <ChildComponent />
</FeathersGet>
```

#### Props

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

**service** _\<object>_ - Direct access to the service, should you need it

**transform** _\<function>_ - Transformation function to run on data before it's passed down.

### \<FeathersService>

```jsx
<Service name={"service-name"}>
  <ChildComponent />
</Service>
```

#### Props

name _\<string>_ - Name of the service

#### Child Properties

**app** _\<object>_ - Direct access to the feathers app, should you need it

**service** _\<object>_ - Direct access to the service, should you need it

### Child methods

**create(data)** - Create a new item on the service

**update(id, data, \<query>)** - Replace the entire document(s) with the given id or query

- Use null for id to update multiple items using a query.
- Passing null to id without specifying a query will result in an error

**patch(id, data, \<query>)** - Patch an existing object \* use null for id to update multiple items using a query.

**remove(id, \<query>)** - Remove the entire document(s) with the given id or query
_ Use null for id to update multiple items using a query.
_ Passing null to id without specifying a query will result in an error

**removeAll()** - Remove all entries

# Constants

**ASC** = 1 -
Use with sort prop `<FeathersQuery>` to sort items in ascending order

**DESC** = -1 -
Use with sort prop `<FeathersQuery>` to sort items in descending order
