import extend from 'extend'


export default (app) => {
  module.app=app;
  module.middleware=require('./reactMiddleware').default; // for some reason it works sometimes(cant reproduce) without '.default'
  console.log(module.middleware);
  app.use(module.middleware);
}

module.change_code=(o,n)=>{
  var stack=o.app._router.stack;
  for( var i=0; i<stack.length;++i ){
    if(stack[i].handle==o.middleware){
      o.middleware = require('./reactMiddleware').default;
      stack[i].handle = o.middleware;
    }
  }
  extend(n,o);
}


