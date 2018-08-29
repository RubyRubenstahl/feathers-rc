# <Feathers> Provider

Usess the context api to provide access to the.
This component *must* wrap child compoentents.  
```jsx
<Feathers host={example.com} port={3030}>
    <FeathersApp>
    <FeathersQuery>
    <FeathersGet>
    ...
</Feathers>
```


# <FeathersApp>
```jsx
<FeathersApp>
    <ChildComponent/>
</FeathersApp>
```

## Child Properties
### connected <boolean>
True if the socketio connection is live

### app
Access the app directly when needed


# <FeathersQuery>
Fetches an arbitrary number of 
```jsx
<FeathersQuery service={'service-name'} query={{roomId:5}} limit={10} skip={3} liveUpdate={true}>
    <ChildComponent/>
</FeathersQuery>
```

## Props
### query <number>
A query to run on the service. The result will be passed to the *data* prop (normalized for pagination)

### limit <number>
Number of records per page

### skip <number>
Number of records to skip

### disablePagination
Kind of speaks for itself...

### liveUpdate <boolean>
If true, subscribe to changes and re-run the query if any changes are detected to the loaded queries. 

### transform <function>
Transformation function to run on data before it's passed down. 

## Child Properties

### data <object, array, or null>
The data returned from the query. 
* Null if the query has not been returned or has no data. 
* Contains the data returned from the query.
* Data will be normalized if paginated. 
* If a transform function was passed to the parent component, the data will have been processed by the transformation function. 

### paginated <boolean>
Indicates whether the response is paginated. 

### startIndex <number>
Index of the first record within the query (the value passed to skip)

### nextPage <number>
The start index of the next page (use with skip). Null if no more pages available or pagination is disabled.

### prevPage <number>
The start index of the previous page (use with skip). Null if no more pages available or pagination is disabled.

### recordCount <number>
Total nunber or record found in the query. Null if the data is not included

### error <object>
* name <string>
* message <string>
* code <number>
* errors <object>
* data <object>
* classname <string>

### hasData
True if the normalized data is not null, empty array, or empty object

### fetching
True if there is currently a request in-flight

### app
Direct access to the feathers app, should you need it

### service
Direct access to the service, should you need it


# <FeathersGet>
Fetches a single object by its id
```jsx
<FeathersGet service={'my-service'} id={objId}>
    <ChildComponent/>
</FeathersGet>


## Props

### data <object>
The data returned from the query. 
* Null if the query has not been returned or has no data. 
* Contains the data returned from the query.
* If a transform function was passed to the parent component, the data will have been processed by the transformation function. 


### error <object>
* name <string>
* message <string>
* code <number>
* errors <object>
* data <object>
* classname <string>

### hasData
True if the normalized data is not null, empty array, or empty object

### fetching
True if there is currently a request in-flight

### transform <function>
Transformation function to run on data before it's passed down. 

### app
Direct access to the feathers app, should you need it

### service
Direct access to the service, should you need it

# <Service>
```jsx
<Service name={'service-name'}>
    <ChildComponent/>
</Service>
```

## Props
### name <string>
Name of the service

## Child Properties
Service provides expexts to see a number of props that allow you to interact with the service. 



### app
Direct access to the feathers app, should you need it

### service
Direct access to the service, should you need it



## Child methods

### create(data)
create a new

### update(id, data, <query>)
Replace the entire document(s) with the given id or query
* Use null for id to update multiple items using a query.
* Passing null to id without specifying a query will result in an error

### patch(id, data, <query>)
Patch an existing object
* use null for id to update multiple items using a query. 

### remove(id,  <query>)
Remove the entire document(s) with the given id or query
* Use null for id to update multiple items using a query.
* Passing null to id without specifying a query will result in an error

### removeAll()
Remove all entries


