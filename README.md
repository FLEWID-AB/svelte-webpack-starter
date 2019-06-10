# Webpack Starter Template for Svelte Applications

Includes

* SASS (SCSS)
* Webpack 4
* Routing
* PWA including Service Worker and App Manifest

## Getting started

Clone the repository with [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit FLEWID-AB/svelte-webpack-starter my-app
cd my-app
yarn install
```

To start the application locally:

```bash
yarn start
```


Create a production build:

```bash
yarn build:production
```

## Routing

Configure your routes in App.svelte, or create a custom routes.js file and include it as a property to the `<Router>` Component.
This package uses [page](https://github.com/visionmedia/page.js) for routing.

## App Manifest

Change the values in webpack.config.js to match your own icons and Application name