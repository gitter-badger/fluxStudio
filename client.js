import emmett from 'emmett'
import baobab from 'baobab'

import React  from 'react/addons'
import use    from './decorators/decorator'

var app={};
window.app=app;

app.event = new emmett();

app.state = baobab({
  msg:'hello',
  inc:1
});


app.registerAction = function(name,func){
  return app.event.on(name,function(e){
    return func.call(e,e.data.state, e.data.data, e.data.app) 
  });
};

app.registerAction('inc',function(state){
  state.set('inc',state.get('inc')+1); 
});

app.inject=use.rootInjector(app.state);


app.action=((name,data)=>
  app.event.emit.bind(app.event,name,{state:app.state,app:app,data:data})
);

@use.cursors({'msg':['msg']})
@use.cursors({'inc':['inc']})
@use.getContext(['app'])
class App2 extends React.Component {
  render(){
    return (<div> <h1>{this.props.msg}</h1> <button onClick={ this.props.app.action('inc') }>{this.props.inc}</button> </div>);
  }
};


@app.inject
@use.pure
@use.contextInjector( {app:app} )
class App extends React.Component {
  render(){
    return <App2/>
  }
};


setTimeout(()=>{ app.state.set('msg','world'); },1000);

document.addEventListener("DOMContentLoaded",  app.event.emit.bind(app.event,'dom:load') );

app.event.on('dom:load',function(){
  React.render(<App />, document.body);
});
