import extend from 'extend'
import emmett from 'emmett'

export default (app,port) => {
  module.app=app;
  module.middleware = require('./reactService')(app);

  app.action=((name,data) => function(){
    return app.event.emit(name,{state:app.state,app:app,data:data,extra:arguments});
  });

  app.use(module.middleware);
};

module.change_code=(o,n)=>{
  var stack=o.app._router.stack;
  for( var i=0; i<stack.length;++i ){
    if(stack[i].handle==o.middleware){
      o.middleware = require('./reactService')(o.app);
      stack[i].handle = o.middleware;
    }
  }
  extend(n,o);
}


