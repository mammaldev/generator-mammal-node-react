# <%= appName %>

## Developer setup

Assuming [npm][npm] and [Entry][entry] are globally installed you can simply run
`entry` from the root directory of this repository.

You may wish to modify `.env` (or create it from `.env.example` if it does not
yet exist) to suit your local system.

## Structure

### `src/`

All application source files are grouped in this directory. Its various
subdirectories contain code for different parts of the app.

#### `src/client`

Files related only to the client-side app. Since this is a "universal" app most
of the code is shared between client and server so there won't usually be much
in here.

##### `src/client/styles`

Sass (SCSS) stylesheets. All styles for the client app should be placed within
this directory. The `app.scss` file is treated as the root stylesheet and should
therefore import all others. No deeper directory structure is enforced as yet.

#### `src/server`

Files related only to the server-side app. This will mainly be API route
handlers and business logic in controllers. The `server.jsx` file starts a web
server and defines a catch-all route handler which is used to render the client
app.

##### `src/server/controllers`

Business logic. Most route handlers will import a controller. Conventionally
controller methods are grouped into files by "model".

##### `src/server/routes`

Server-side route handlers. Conventionally a route handler will receive a
request, check authorization and optionally perform simple data validation
before passing the relevant data through to a controller method. In general
business logic should not occur within route handlers.

#### `src/universal`

Files related to the "universal" single-page app. Probably the most important
files in here will be React "page" components. The `routes.jsx` file contains
[React Router][router] route definitions and imports "page" components to
associate with routes. The `reducers.js` file imports all page-specific state
[Redux][redux] reducers and exports a single combined reducer.

##### `src/universal/components`

Common React components that are not specific to a single feature or "page". The
`app.jsx` file contains the base component in which all other components will be
rendered. No deeper directory structure is enforced as yet.

##### `src/universal/pages`

React "page" components and associated files grouped into directories by feature
or page. Each subdirectory should follow the same structure as the "homepage"
directory explained below.

###### `src/universal/pages/$page`

Files related to a single feature or page. The `actions.js` file defines Redux
"action creators" that are specific to the feature or page. The `reducers.js`
file contains Redux "reducers" that are specific to the feature or page. The
`selectors.js` file contains [Reselect][reselect] Redux selectors that are
specific to the feature or page.

###### `src/universal/pages/$page/components`

React "presentational" components. Components that are not connected to the
Redux store but are useful throughout multiple templates belonging to this
feature. Presentational components that are more widely useful should reside in
`src/universal/components`.

###### `src/universal/pages/$page/templates`

React "page" components. The page component for a dashboard feature may reside
at `src/universal/pages/dashboard/templates/index.jsx`. These components are
"connected" to the Redux store and may dispatch Redux actions. They can make use
of "presentational" components by passing data through props.

### `resources/`

Static assets. The web server will serve files from this directory directly. Be
careful to avoid naming conflicts with your route handlers. No deeper directory
structure is enforced as yet but conventionally there would be at least an
`images/` subdirectory.

### `dist/`

Compiled assets. The build process places processed files in this directory,
grouped by type.

[npm]: https://www.npmjs.com
[entry]: https://github.com/mammaldev/entry
[react]: https://facebook.github.io/react
[rr]: https://github.com/reactjs/react-router
[redux]: https://github.com/rackt/redux
[reselect]: https://github.com/rackt/reselect
