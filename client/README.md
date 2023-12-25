# Getting Started with Create React App - Calculator Client

This project is a client-side implementation for a client-server calculator application [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

1. Clone the Calculator App repository to your local machine.
```bash
git clone https://git.sysgears.com/mykyta.kraskovskyi/calculator-app.git
```

2. Navigate to the client directory within the cloned repository.
```bash
cd client
```

3. Before running the client, install the dependencies:
```bash
npm install
```
4. Run the app using: 
```bash
npm run start
```

## Usage

The calculator supports basic arithmetic operations, such as addition, subtraction, multiplication, and division. Also advanced operations available such as raise, square root etc. At last engineering operations: sin, cos, tan, atan. Users can also see and use calculations history.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## API Services
The client-side of the calculator application is built with a modular architecture, featuring the following API services:

### 1. HistoryService

`getHistory(limit: number): Promise<ICalculatorItem[]>`: Retrieves the calculation history from the server, with an optional limit parameter to control the number of records returned.

`saveToHistory(expression: string, result: string)`: Promise<ICalculatorItem>: Adds a new calculator history record to the database, storing both the expression and its result.

### 2. CalculatorService

`getMathOperationsDetails(): Promise<ICalculatorServiceResponse<IMathOperations>>`: Fetches information about available mathematical operations from the server. This includes details such as operation names and symbols.

`calculateExpression(expression: IExpressionData): Promise<ICalculatorServiceResponse<string>>`: Performs the calculation for a given expression on the server and returns the result. The IExpressionData parameter represents the expression to be calculated.

Feel free to explore and customize these services based on your specific requirements. If you need additional information or have any questions, please feel free to ask.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
