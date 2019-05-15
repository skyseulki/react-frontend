import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './component/NavBar'
import Login from './component/Login/Login'
import ShowUser from './component/ShowUser/ShowUser'
import RestaurantsContainer from './component/RestaurantsContainer/RestaurantsContainer'

import * as routes from './constants/routes'
import './App.css';

class App extends Component {
  state = {
    currentUser: null
  }

  doSetCurrentUser = user =>
    this.setState({
      currentUser: user
    })

  render() {
    const { currentUser } = this.state
    return (
      <div>
        <NavBar currentUser={currentUser} />
        <Switch>
          <Route exact path={routes.ROOT} render={() => <div>ROOT or groot?</div>} />
          <Route exact path={routes.REGISTER} render={() => <div>Register</div>} />
          <Route exact path={routes.USERS} render={() => <div>USERS</div>} />
          <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser doSetCurrentUser={this.doSetCurrentUser} currentUser={this.state.currentUser}/>} />
          <Route exact path={routes.POSTS} render={() => <div>POSTS</div>} />
          <Route exact path={routes.RESTAURANTS} render={() => <RestaurantsContainer currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser}/> } />
          <Route exact path={routes.LOGIN} render={() => <Login currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route render={() => <div>NOT FOUND</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
