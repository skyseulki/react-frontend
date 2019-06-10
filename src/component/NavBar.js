import React from 'react';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './NavBar.css';

const NavBar = ({ currentUser, doLogOut }) => 
    <Navbar expand='lg'>
        <Navbar.Brand ><NavLink to={'/'}>SaturDate</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
        {/* <NavLink className='navbar-item' to={routes.ROOT} exact activeClassName='active'>ROOT </NavLink> */}
        {/* <NavLink className='navbar-item' to={routes.POSTS} exact activeClassName='active'>POSTS </NavLink> */}
            <Nav className='ml-auto'>
                <Nav.Item>
                    <NavLink to={routes.RESTAURANTS} exact activeClassName='active'>Browse </NavLink>
                </Nav.Item>
        {
            currentUser
                ? <Nav.Item><NavLink to={routes.RESTAURANTS} activeClassName='active'>Create a Date!</NavLink></Nav.Item>
                : <Nav.Item><NavLink to={routes.REGISTER} activeClassName='active'>Register </NavLink></Nav.Item>
        }
        {
            currentUser
                && <Nav.Item><NavLink exact to={`${routes.USERS}/${currentUser._id}`} activeClassName='active'>{currentUser.username}'s Profile </NavLink></Nav.Item>
        }
        {
            currentUser
                ? <Nav.Item><NavLink to={routes.REGISTER} activeClassName='active' onClick={doLogOut}>Logout, {currentUser.username}</NavLink></Nav.Item>
                : <Nav.Item><NavLink to={'/login'} activeClassName='active'>Login </NavLink></Nav.Item>
        }
        </Nav>
    </Navbar.Collapse>
    </Navbar>

export default NavBar;
