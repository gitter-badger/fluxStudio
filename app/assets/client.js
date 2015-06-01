import emmett from 'emmett'
import baobab from 'baobab'

import React  from 'react/addons'
import use    from '../decorators/decorator'
import Routes from '../routes'
import Router from 'react-router'
import {Root} from 'baobab-react/wrappers'
import registerActions from '../actions.js'
import extend from 'extend'


var app={};
window.app=app;

app.event = new emmett();

app.registerAction = function(name,func){
  return app.event.on(name,function(e){
    return func.call(e,e.data.state, e.data.data, e.data) 
  });
};

app.action=((name,data) => function(){
  return app.event.emit(name,{state:app.state,app:app,data:data,extra:arguments});
});

var defaultState=JSON.parse(localStorage.getItem('todo')) || require('../defaultState.js');


app.state= new baobab(
  extend(defaultState,{
    app:app
  })
);

registerActions(app);

document.addEventListener("DOMContentLoaded",  app.event.emit.bind(app.event,'dom:load') );

app.event.on('dom:load',function(){
  Router.run( Routes ,Router.HistoryLocation,function(App, state) {
    React.render(<Root tree={app.state}><App {...state} /></Root>, document.body);
  });
});
