import React from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes'
import './NavBar.css'

const NavBar = ({ currentUser, doLogOut }) => 
    <div className="navbar is-primary">
        <NavLink className='navbar-item' to={routes.ROOT} exact activeClassName='active'>ROOT </NavLink>
        {/* <NavLink className='navbar-item' to={routes.POSTS} exact activeClassName='active'>POSTS </NavLink> */}
        <NavLink className='navbar-item' to={routes.RESTAURANTS} exact activeClassName='active'>Restaurants </NavLink>
        <NavLink className='navbar-item' to={routes.REGISTER} activeClassName='active'>Register </NavLink>
        {
            currentUser
                && <NavLink exact to={`${routes.USERS}/${currentUser._id}`} activeClassName='active'>{currentUser.username}'s PROFILE </NavLink>
        }
        {/* <NavLink to={routes.USERS} exact activeClassName='active'>USERS </NavLink> */}
        
        {
            currentUser
                ? <NavLink className='navbar-item' to={routes.REGISTER} activeClassName='active' onClick={doLogOut}>Logout, {currentUser.username}</NavLink>
                : <NavLink className='navbar-item' to={'/login'} activeClassName='active'>Login </NavLink>
        }

    </div>

export default NavBar;
