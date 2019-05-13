import React from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes'
import './NavBar.css'

const NavBar = ({currentUser}) => 
    <div>
        <h5>This is your NAVBAR</h5>
        <NavLink to={routes.HOME} activeClassName='active'>HOME </NavLink>
        {
            currentUser
                && <NavLink exact to={`${routes.USERS}/${currentUser._id}`} activeClassName='active'>{currentUser.username} PROFILE</NavLink>
        }
        <NavLink to={routes.USERS} exact activeClassName='active'>USERS </NavLink>
        <NavLink to={routes.POSTS} exact activeClassName='active'>POSTS </NavLink>
        <NavLink to={routes.RESTAURANTS} exact activeClassName='active'>RESTAURANTS </NavLink>
        <NavLink to={routes.ROOT} exact activeClassName='active'>ROOT </NavLink>
        {
            currentUser
                ? <NavLink to={routes.HOME} activeClassName='active'>Logout, {currentUser.username}</NavLink>
                : <NavLink to={'/login'} activeClassName='active'>Login </NavLink>
        }

    </div>

export default NavBar;
