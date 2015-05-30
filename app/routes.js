
import React from 'react'
import Router, {Route,DefaultRoute, Redirect, NotFoundRoute,RouteHandler,Link} from 'react-router'
import use    from './decorators/decorator'

@use.cursors({'msg':['msg']})
class About extends React.Component {
  render() {
    return <h2>A {this.props.msg}</h2>;
  }
}

import Inbox from './views/app'

class App extends React.Component { 
  render () {
    return (
      <div>
        <h1>App</h1>
        <Link to="/about">about</Link>
        <Link to="/inbox">inbox</Link>
        <RouteHandler/>
      </div>
    )
  }
}



var routes = (
  <Route name='c' path='/' handler={App}>
    <Route name='a' path="about" handler={About}/>
    <Route name='b' path="inbox" handler={Inbox}/>
  </Route>
);




module.exports = routes;
