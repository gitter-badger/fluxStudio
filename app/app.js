import service from './reactService' 

var s=service(app);
export default (app,port) => {

  app.use(function(a,b,c){ return s(a,b,c); });

};

module.change_code = ()=>{
  var name = require.resolve('./routes');
  delete require.cache[name];
  s=service(app);
};



