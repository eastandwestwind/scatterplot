# Scatterplot

## Table of Contents

1. [Description](#description)
2. [Local Testing](#local-testing)
3. [Dependencies](#dependencies)

## <a name="description">Description</a>

This is an express app that can be used in 2 ways:
1. Defines endpoint to mock data that returns JSON
2. Serves a static page that renders a [Plotly](https://plot.ly/javascript/) scatterplot based on the mock data.



## <a name="local-testing">Local Testing</a>

```text
npm install
```

```text
npm start
```

#### <a name="method1">Ping Endpoint Directly</a>
Navigate to `http://localhost:3000/api/data`.


#### <a name="method2">Scatterplot Visualization</a>
Navigate to `http://localhost:3000/`.




## <a name="dependencies">Dependencies</a>

* [express](https://expressjs.com/en/4x/api.html)- provides app endpoints, error handling, publicly accessible files
* [axios](https://github.com/axios/axios)- promise based HTTP client
