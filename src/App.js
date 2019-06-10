import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './component/NavBar'
import Login from './component/Login/Login'
import ShowUser from './component/ShowUser/ShowUser'
import RestaurantsContainer from './component/RestaurantsContainer/RestaurantsContainer'
import Register from './component/Register/Register'

import * as routes from './constants/routes'
import './App.css';


class App extends Component {
  state = {
    currentUser: null,
    isLogged: false,
    allRestaurant: []
  }

  delRestaurants = async(info) => {
    try{
      const delRes = await fetch(`/users/${this.state.currentUser._id}/restaurants/${info}`,{
        method: 'DELETE',
        credentials: 'include'
      })
      const deletedRes = await delRes.json();
      // console.log(deletedRes, info)
      if(deletedRes.deleted){
        this.setState({
          allRestaurant: [...this.state.allRestaurant.filter(r => r._id !== info)]
        })
      }
      // this.getRestaurants()

    }catch(err){
      return err
    }
  }

  getRestaurants = async() => {
    try{
      const { currentUser } = this.state
      await this.setState({
        allRestaurant: currentUser.restaurants
      })
    
      // console.log('inside getres')
    }catch(err){  
      return err
    }
  }

  doSetCurrentUser = user =>
    this.setState({
      currentUser: user,
      isLogged: true
    }, ()=> {
      this.getRestaurants()
    })

  doLogOut = () =>
    this.setState({
      currentUser: null
    })

  render() {
    const { currentUser, allRestaurant } = this.state
    // console.log('current user id',this.state.currentUser)
    // console.log('array of restaurants:', this.state.allRestaurant)
    return (
      <div>
        <NavBar currentUser={currentUser}doLogOut={this.doLogOut} />
        <Switch>
          <Route exact path={routes.ROOT} render={() => <div>ROOT or groot?</div>} />
          <Route exact path={routes.REGISTER} render={() => <Register currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route exact path={routes.USERS} render={() => <div>USERS</div>} />
          <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser delRestaurants={this.delRestaurants} allRestaurant={allRestaurant} doSetCurrentUser={this.doSetCurrentUser} currentUser={this.state.currentUser}/>} />
          <Route exact path={routes.POSTS} render={() => <div>POSTS</div>} />
          <Route exact path={routes.RESTAURANTS} render={() => <RestaurantsContainer currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser}/> } />
          <Route exact path={routes.LOGIN} render={() => <Login currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route render={() => 
            <div>
              <p className='not-found-heading'>The page you are looking for is not found. Please go back.</p>
              <img className='not-found' src='img/404.png' alt='404 - Page Not Found' />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
