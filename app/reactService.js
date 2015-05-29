import React  from 'react/addons'
import use    from './decorators/decorator'

import Router from 'react-router'
import fs from 'fs'
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
  console.log('app');
  app.state=new baobab({
    msg:'hello',
    inc:1,
    app:app
  });

  
  return (req, res, next) => {
    try{;
      let router = Router.create({location: req.url, routes: Routes})
      router.run((App, state)=>{
        let html = React.renderToString(<Root tree={new baobab(app.state.get())}><App {...state} /></Root>); 
        return res.end(tmpl.replace('REACT_HTML',html));
      });
    }catch(e){
      next(e);
    }
  };
}

module.change_code = ()=>{
  var name = require.resolve('./routes');
  delete require.cache[name];
  
};
