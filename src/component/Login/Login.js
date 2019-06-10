import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './Login.css';


class Login extends Component {
    state = {
        username: '',
        password: '',
        logged: false
    }
    
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    
    onSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await fetch('/users/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
            'Content-type': 'application/json'
        }
    });
    
        const parsedResponse = await loginResponse.json();
        console.log(parsedResponse)
        //parsedResponse.success
        if(parsedResponse.user){ 
            this.props.doSetCurrentUser(parsedResponse.user)
                this.setState({
                    logged: true
                })
        } else {
            this.setState({
                message: 'Username and/or Password incorrect.'
            })
        }
    };

    render() {
        const { logged, username, password } = this.state
        return (
            logged
            ? <Redirect to={`/users/${this.props.currentUser._id}`} />
            : <Row>
                <Col>
                    <Form onSubmit={this.onSubmit}>
                    <h4 className='login-headline'>Welcome back</h4><br/><br/>
                    <Form.Group className='login' controlId='formBasicUsername'>
                        <Form.Label>Username</Form.Label>
                            <Form.Control size='lg' input type='text' name='username' placeholder='username' value={username} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className='login' controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                            <Form.Control size='lg' input type='password' name='password' placeholder='Password' value={password} onChange={this.changeHandler} />
                    </Form.Group>
                    <Button className='login-btn' variant='primary' type='submit'>Log in</Button><br/>
                    <div className= 'login-msg'>
                        {
                            
                            this.state.message
                        }
                    </div> 
                    <p className='register-link'>Not a user?<Link to={'/register'}>Click here!</Link></p>
                    </Form>
                </Col>

                <Col>
                    <div className='login-right'>
                        <img className='login-img' src='img/login.svg' alt='Login Img' />
                    </div>
                </Col>
            </Row>
        )
    };
};

export default Login;