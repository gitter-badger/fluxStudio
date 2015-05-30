import extend from 'extend'


export default (app,port) => {
  module.app=app;
  module.middleware = require('./reactService')(app);
  app.use(module.middleware);
};

module.change_code=(o,n)=>{
  console.log(!!o.app,!!n.app);
  var stack=o.app._router.stack;
  for( var i=0; i<stack.length;++i ){
    if(stack[i].handle==o.middleware){
      o.middleware = require('./reactService')(o.app);
      stack[i].handle = o.middleware;
    }
  }
  extend(n,o);
}


