# Make a note server

Simple API with Express

## Structure

- `/controllers` - contains modules that expose functions to get the requested data from the models, and returning it in response to a request,
- `/database` - contains `database.ts` file which holds database connection,
- `/exceptions` - stores different API exceptions, like `HttpException` class with common `IApiError` error interface,
- `/middlewares` - stores Express middleware function
- `/models` - constructors compiled from `Schema` definitions. An instance of a model is called a MongoDB document. Models are responsible for creating and reading documents from the underlying MongoDB database.
- `/routes` - modules exporting Express router, forwards the supported requests (and any information encoded in request URLs) to the appropriate controller functions

## Available endpoints

- POST `/notes/` - create new note,
- POST `/notes/:noteId/token` - generate new token, required for operations Notes resource,
- GET `/notes/:noteId` - return a note with given `noteId`, expects `Aurhorization` header with `Bearer` token,
- PUT `/notes/:noteId` - update a note with given `noteId`, expects `Aurhorization` header with `Bearer` token.

## Commands

`npm run dev` - runs development environemnt, watches file changes with nodemon

`npm run build` - builds production environment
