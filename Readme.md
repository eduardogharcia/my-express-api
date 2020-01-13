# Guidelines

## Available status codes

Ok
- 200: 0K

Client Errors
- 400: General errors
- 401: Unauthorized (unauthenticated, not logged in)
- 403: logged in by invalid privileges
- 404: Resource not found

Server Errors
- 500: Server general problem

## Error responses pattern

`res.status(<HTTP-STATUS-ERROR-CODE>).json(<PAYLOAD>)`

```
{
  errors: [
    {
      message: "Description of the error"
    }
  ]
}
```

## Usage
1 - `npm install`

2 - Install and execute mongodb (or a database as a service)

3 - Set enviroment variables in .env file

4 - `npm run dev` or `npm test`

5 - `npm run lint`
