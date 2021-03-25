# Make a note app

## running dev environment

- create `.env` file based on `env.default`
- to run development environment with Docker compose, use `docker-compose up` in root folder of the project.
- to stop running and remove containers, use `docker-compose down` in root folder of the project.

## Documentation

"Make a note" application contains of three Docker containers:

- client - stores `React` client application, bootstraped with [Create React App](https://github.com/facebook/create-react-app),
- server - stores `Node.js` server written in [Express.js](https://expressjs.com/),
- mongo - stores database server, by using MongoDB official image,

### Server

#### Make a note server

Simple API with Express

#### Structure

- `/controllers` - contains modules that expose functions to get the requested data from the models, and returning it in response to a request,
- `/database` - contains `database.ts` file which holds database connection,
- `/exceptions` - stores different API exceptions, like `HttpException` class with common `IApiError` error interface,
- `/middlewares` - stores Express middleware function
- `/models` - constructors compiled from `Schema` definitions. An instance of a model is called a MongoDB document. Models are responsible for creating and reading documents from the underlying MongoDB database.
- `/routes` - modules exporting Express router, forwards the supported requests (and any information encoded in request URLs) to the appropriate controller functions

#### Available endpoints

- POST `/notes/` - create new note,
- POST `/notes/:noteId/token` - generate new token, required for operations Notes resource,
- GET `/notes/:noteId` - return a note with given `noteId`, expects `Aurhorization` header with `Bearer` token,
- PUT `/notes/:noteId` - update a note with given `noteId`, expects `Aurhorization` header with `Bearer` token.

#### Available scripts

`npm run start` - runs development environemnt, watches file changes with nodemon

`npm run build` - builds production environment

### Client

Created with React and MaterialUI. Uses [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) to separate concerns between compoents located in `/components` folder.

Routes available in application are stored in `App.tsx` components.

##### Available commands

`npm run start` - runs development environemnt, watches file changes with webpack-dev-server

`npm run build` - builds production environment
