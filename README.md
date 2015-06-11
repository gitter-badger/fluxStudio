# fluxStudio developer preview
rapid development framework with react, baobab,express,hotswap,webpack,babel&amp;less for isomorphic applications
#features
- isomorphic apps : pre-render your application on the server
- hotpatching : update server app without restarting; ideal for continoous delivery
- babel : develop using newest ES6+ features like classes and generators
- webpack : generate suitable html boilerplate from your app
- static : compile your app to static pages for optimal performance or simple websites 
- react : see https://facebook.github.io/react/
- flux  : see https://facebook.github.io/react/docs/flux-overview.html
- baobab: handle and track your apps statechanges with immutable data structures.

#commands
- git clone https://github.com/nikhedonia/fluxStudio.git

  copy current version
  
- npm i
 
  install server dependencies

- npm run dev 
 
  build & run server in development mode 

- npm run start 

  build & run server in production mode
  
- npm run build 

  build server

- npm run static

  build server and generate static files

#Todo

- increase modularity 
- introduce a pluginssystem
  currently there are many dependencies and many features which not everyone needs. introducing a pluginsystem may reduce the complexity and size of this project
- add cli support
  woudnt be nice to auto-generate boilerplate from the cli?
  examples
  ```sh 
  $ reactStudio create myTodoApp // create boilerplate
  
  $ reactStudio generate static  // create static version of the app
  
  $ reactStudio run dev . // run current project in development mode
  ``` 
- write tests
  just a fun and useful thing to do
- conditional hotswapping
  hotswapping is a dangerous thing, which may crash the server.
  only hotswap modules if it passes all relevant tests, would increase the stability
- cleanup folder structure
- integrate flow and linters
- autogenerate documentation
  
 


  
