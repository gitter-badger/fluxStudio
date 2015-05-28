import React  from 'react'
import use    from './decorators/decorator'

import Router from 'react-router'


export default function(app,port){


app.use(function(req, res, next) {
  try{
    var Routes =require('./routes');
    var router = Router.create({location: req.url, routes: Routes})
    router.run(function(Handler, state) {
      var html = React.renderToString(<Handler {...state} />);

      return res.end(html);
    });
  }catch(e){
    next(e);
  }
});

}

