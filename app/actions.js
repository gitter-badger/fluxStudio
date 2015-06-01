export default (app)=>{

  app.registerAction('todo:set:addTodo', (state,data)=>{
    state.select('todo').push( {done:0,title:data} );
  });

  app.registerAction('todo:set:toggleEntry', (state,data,ev)=>{
    state.set(['todo',data.index,'done'], (data.done+1)%3);        
  });

  app.registerAction( /todo:set:(.*?)/ , (state)=>{
    setTimeout( ()=>{
      if(localStorage)
        localStorage.setItem('todo', JSON.stringify( {'todo':state.get('todo')} ));
    },100);
  });



}
