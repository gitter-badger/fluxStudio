
import React from 'react/addons'
import Router, {Route,DefaultRoute, Redirect, NotFoundRoute,RouteHandler,Link} from 'react-router'
import use    from './decorators/decorator'
import {Branch} from 'baobab-react/wrappers'
import extend from 'extend'
var Animate =  React.addons.CSSTransitionGroup;


var StateToText={0:'-',1:'>',2:'+'};

@use.cursors({action:['app','action']})
class TodoEntry extends React.Component {
  render() {
    return ( 
      <li className='item'>
        <button onClick={ this.props.action('todo:set:toggleEntry',this.props) } >   
          { StateToText[this.props.done] }
        </button>
        <span className="todo-title"> { this.props.title } </span>

        <button className="remove" onClick={ this.props.action('todo:set:removeEntry',this.props) } >   
          x
        </button>

      </li>
    );
  }
}

@use.cursors({action:['app','action']})
@use.linkedState
class TodoAdd extends React.Component {
  
  state = {newEntry:''}

  add(){
    this.props.action('todo:set:addTodo',this.state.newEntry)();
    this.setState({newEntry:''});
  }


  render() {
    return ( 
      <div>
        <button onClick={this.props.action('todo:set:reset')} > reset app </button>
        <input type="text" 
               valueLink={this.linkState('newEntry')} 
               placeholder="new Entry" /> 
        <button onClick={ this.add.bind(this) } >
          Add Todo
        </button>
      </div>
    );
  }

}

@use.cursors({action:['app','action']})
class TodoList extends React.Component {
  render() {
    return (
      <div>
        <ul> 
          <Animate transitionName='item'>
            {(this.props.todo||[]).map( (e,i)=>
              <TodoEntry {...e} key={e.index} />
            )}
          </Animate>
        </ul>
      </div>
    );
  }
}

@use.cursors({todo:['todo']})
class Todo extends React.Component {
  render(){
    var toShow=this.props.todo.map((e,i)=>extend({},e,{index:i}));
    if(this.props.filterBy!==undefined &&this.props.filterBy>-1){
      toShow=toShow.filter((e)=>(e.done==this.props.filterBy));
    }

    return <TodoList todo={toShow} /> 
  }
}

var pathToFilter={
 '/':-1,
 '/Undone/':0,
 '/Working/':1,
 '/Done/':2
};

class App extends React.Component { 
  render () {
    return (
      <div className='todo'>
        <h1>ToDo-App</h1>
        <TodoAdd />
        <div className='links'>
          <span> Filter : </span>
          <Link to="/"><button> All </button></Link>
          <Link to="/Done/"><button>Done(+)</button></Link>
          <Link to="/Working/"><button>Working({'>'})</button></Link>
          <Link to="/Undone/"><button>Undone(-)</button></Link>

        </div>
        <Todo  filterBy={pathToFilter[this.props.path]} />
      </div>
    );
  }
}

var routes = (
  <Route path='/' >
    <DefaultRoute  handler={App} />
    <Route  path="Done/"     handler={App}/>
    <Route  path="Working/"  handler={App}/>
    <Route  path="Undone/"   handler={App}/>
  </Route>
);




module.exports = routes;
