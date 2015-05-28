import emmett from 'emmett'
import baobab from 'baobab'

import React  from 'react/addons'
import dec    from './decorators/decorator'

var app={};
app.event = new emmett();

app.state = baobab({
  msg:'hello',
});


app.inject=dec.rootInjector(app.state);


dec.branch({
  cursors:{'msg':['msg']}
})
class App2 extends React.Component {
  render(){
    return (<h1>{this.props.msg}</h1>);
  }
};

@app.inject
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
