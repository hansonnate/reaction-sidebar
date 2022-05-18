# Reaction API Guide

A quick guide to our API interface.

### Contents

- [Creating an API Resource](#creating-an-api-resource)
- [Using API Resources in Components](#using-api-resources-in-components)

## Creating an API Resource

To create an API resource, add a new file to the `/api/resources` directory. The basic structure of a resource looks like this:

```js
import { apiClient } from "../Api";

// Resource Methods
const postUser = (body) => apiClient.post("/users", body); // Create
const getUsers = () => apiClient.get("/users"); // Read
const putUser = (id, body) => apiClient.put(`/users/${id}`, body); // Update
const deleteUser = (id) => apiClient.delete(`/users/${id}`); // Delete

export default {
  postUser,
  getUsers,
  putUser,
  deleteUser,
};
```

`apiClient` is an axios instance. Axios is the service we use to handle connecting and sending requests to the server. For more advanced instruction on the methods you can call on the axios instance, see their [documentation](https://axios-http.com/docs/instance).

After creating resource methods, export them as an object.

To make the resource available to React components, reexport the resource in [`/api/index.js`](./index.js).

```js
export { default as UsersApi } from "./resources/users";
```

To use a resource in a component, simply import the resources you would like to use.

```js
import { UsersApi } from "api";
```

More on how to use the API resource in the next section.

## Using API Resources in Components

To use API resources in components, you need to import the `useApi` hook and resources you want to use.

```js
import { useApi, UsersApi, ProjectsApi } from "api";
```

`useApi` returns an object with the following information about the request:  
- `loading` - evaluates to true until the request is complete, then it is false. 
- `error` - contains an error message from the server if one is received.
- `data` - contains the body from the HTTP response (the requested data as a JavaScript object).
- `request` - contains the request that was made to the server.

There are a variety of ways to use the `useApi` hook and how you choose to use it will depend on what you are trying to do. In the example below, we use the React built in hook `useEffect` for GET requests and handlers for a POST request.

```js
import React, { useEffect } from "react";
import { useApi, UserApi, ProjetsApi } from "api";

export const MyCompoments = () => {
  // Resource method hooks
  const getUsers = useApi(UsersApi.getUser);
  const postUser = useApi(UsersApi.postUser);
  const getProjects = useApi(ProjectsApi.getProjects);

  useEffect(() => {
    getUsers.request();
    getProjects.request();
  }, []);

  const handlePostUser = (username, password) => {
    postUser.request({
      username: username,
      password: password,
    });
  };

  return (
    <>
      {/*List Users*/}
      {getUsers.loading && <p>Loading...</p>}
      {getUsers.error && <p>{getUsers.error}</p>}
      {getUsers.data?.map((user) => (
        <p>{user.username}</p>
      ))}

      <button onClick={() => handlePostUser("jacksparrow", "secure_password")}>
        Create User
      </button>
    </>
  );
};
```
