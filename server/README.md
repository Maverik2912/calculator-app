# Calculator App Server

## Description

This is the server-side component of the calculator application, built with Express.js. The server follows a modular approach and currently supports two databases: MongoDB and PostgreSQL.

### `npm start`

## Scripts

### Installation
Before running the server, install the dependencies:
### `npm install`

### Test
To run unit and integration tests for the `calculator` module in the application, use the following npm script:
```bash
npm run test
```

### Start
To start the server, run:
### `npm run start`

This script cleans the dist directory, compiles TypeScript files, and starts the server using tsc-watch and nodemon for automatic recompilation and server restart on file changes.

## Usage

### Expression Calculation
Send a POST request to /expression with a JSON payload containing the expression to calculate. The server responds with the calculated result.
```bash
curl -X POST -H "Content-Type: application/json" -d '{"expression": "2 + 2 * 5"}' http://localhost:3000/expression
```
Response:
### `{"result": 12}`

### Math Operations List
Send a GET request to /math-operations/list to get a list of available mathematical operations with descriptions.
Response
### `{"result": mathOperations}`

### HistoryContainer

#### Get HistoryContainer
Send a GET request to /history to retrieve a list of all operations. You can use the optional query parameter limit to limit the number of returned items.
```bash
curl -X GET http://localhost:4000/history?limit=10
```

#### Add to HistoryContainer
Send a POST request to /history to add an expression and its result to the database. The server responds with the added object.
```bash
curl -X POST -H "Content-Type: application/json" -d '{"expression": "2 + 2 * 5", "result": 12}' http://localhost:4000/history
```

## Database
The server currently supports two databases: MongoDB and PostgreSQL. Configure the database connection details accordingly.

## Contributing
Feel free to contribute to the development of this calculator app server. Fork the repository, make your changes, and submit a pull request.