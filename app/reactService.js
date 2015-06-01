import React  from 'react/addons'

import fs     from 'fs'
import Router from 'react-router'
import baobab from 'baobab'
import {Root} from 'baobab-react/wrappers'
import extend from 'extend'

var tmpl   = fs.readFileSync('./app/html/index.html',{encoding:'utf8'});
var Routes = require('./routes');


fs.watch('./app/html/index.html',()=>{
  fs.readFile('./app/html/index.html',{encoding:'utf8'},(e,str)=>{
    tmpl=str;
  });
});



export default (app)=>{

  app.action=((name,data) => function(){
    return app.event.emit(name,{state:app.state,app:app,data:data,extra:arguments});
  });

  var defaultState=require('./defaultState.js');
  var tree= new baobab(
    extend({},defaultState,{
      app:app
    })
  );

  return (req, res, next) => {
    try{
      let router = Router.create({location: req.url, routes:Routes})
      router.run((App, state)=>{
        let comp = (<Root tree={tree}><App {...state} /></Root>);
        let html = '';
        try{
          let x = React.renderToString(comp); 
          html = x;
        }catch(e){
          console.log(e);
        }finally{
          return res.end(tmpl.replace('REACT_HTML',html));
        }
      });
    }catch(e){
      next(e);
    }
  };
}

