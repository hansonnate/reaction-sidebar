# Mock Server

Some basic instructions for starting the mock server. For more advanced instruction, read the the [json-server documentation](https://github.com/typicode/json-server).

## Running the mock server

In the `mock_server` directory, run the command `npm run api`

## Adding endpoints

You can add endpoints to the server by adding another item to the json object in `src/db.json`. For example, the following json would have two endpoints, organizations and projects.

```json
{
    "organization": [
        ...
    ],
    "projects": [
        ...
    ]
}
```
