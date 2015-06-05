import React  from 'react/addons'

import fs     from 'fs'
import Router from 'react-router'
import baobab from 'baobab'
import {Root} from 'baobab-react/wrappers'
import extend from 'extend'
import path from 'path'
import Routes from './routes';
import defaultState from './defaultState';

var htmlPath = path.resolve('app/html/index.html');
var tmpl   = fs.readFileSync(htmlPath,{encoding:'utf8'});

fs.watch(htmlPath, ()=>{
  fs.readFile(htmlPath,(content)=>{
    tmpl = content;
  });
});


var app={action:(()=>{})};


function routeAndRender(url,Routes,cb){

  var tree= new baobab(
  extend({},defaultState,{
    app:app
    })
  );

  let router = Router.create({location: url, routes:Routes});
  try{
    router.run((App, state)=>{
      let comp = (<Root tree={tree}><App {...state} /></Root>);
      let html = '';
      let x = React.renderToString(comp); 
      html = x;
      cb(html);
    });
  }catch(e){
    cb(null,e);
  }

}



function reactMiddleware(req, res, next) {

  routeAndRender(req.url,Routes, (content,err)=>{
    if(err){
      next(err);
    }else{
     res.set('Content-Type', 'text/html'); 
     res.end(tmpl.replace('REACT_HTML',content));
    }
  });
}


export default reactMiddleware;
