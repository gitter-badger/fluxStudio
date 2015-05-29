import React  from 'react/addons'
import use    from './decorators/decorator'

import Router from 'react-router'
import fs from 'fs'
import baobab from 'baobab'
import {Root} from 'baobab-react/wrappers'

var tmpl = fs.readFileSync('./app/html/index.html',{encoding:'utf8'});





export default function(app,port){

app.state=new baobab({
  msg:'hello',
  inc:1,
  app:app
});


var i=0;
app.use(function(req, res, next) {
 // try{
    setTimeout( ()=>{app.state.set('msg',i++)},2500 );

    let Routes =require('./routes');
    let router = Router.create({location: req.url, routes: Routes})
    router.run(function(App, state) {
      let html = React.renderToString(<Root tree={new baobab(app.state.get())}><App {...state} /></Root>); 
      return res.end(tmpl.replace('REACT_HTML',html));
    });
 // }catch(e){
 //   next(e);
 // }
});

}

