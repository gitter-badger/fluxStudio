import extend from 'extend'

import middleware from './reactMiddleware';

export default (app) => {
  module.app=app;
  module.middleware=require('./reactMiddleware'); //isn't there a better method?
  app.use(module.middleware);
};

module.change_code=(o,n)=>{
  var stack=o.app._router.stack;
  for( var i=0; i<stack.length;++i ){
    if(stack[i].handle==o.middleware){
      o.middleware = require('./reactMiddleware');
      stack[i].handle = o.middleware;
    }
  }
  extend(n,o);
}


