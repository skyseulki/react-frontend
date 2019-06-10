import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './Register.css';



class Register extends Component {
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
        const registerResponse = await fetch('/users', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
            'Content-type': 'application/json'
        }
    });
    
        const parsedResponse = await registerResponse.json();
        // console.log(parsedResponse)
        //parsedResponse.success
        if(parsedResponse.user){ 
            this.props.doSetCurrentUser(parsedResponse.user)
                this.setState({
                    logged: true
                })
        }
    };

    render(){
        const { logged, username, password } = this.state
        return (
            logged
            ? <Redirect to={`/users/${this.props.currentUser._id}`} />
            : <RegisterForm 
                changeHandler={this.changeHandler}
                onSubmit={this.onSubmit}
                username={username}
                password={password}
                />
            )
    }
}

const RegisterForm = ({ changeHandler, onSubmit, username, password }) => 
    <Row>
        <Col>
            <Form onSubmit={e => onSubmit(e)}>
                <h4 className='register-headline'>Create an account</h4><br/><br/>
                <Form.Group className='register' controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control size='lg' input onChange={e => changeHandler(e)}type='text' name='username' placeholder='username' value={username} />
                </Form.Group>
                
                <Form.Group  className='register' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control size='lg' input onChange={e => changeHandler(e)}type='password' name='password' placeholder='password' value={password} />
                    <Form.Text className='text-muted'>
                        Must contain more than 6 characters
                    </Form.Text>
                </Form.Group>

                <Form.Group  className='register' controlId='formBasicRePassword'>
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control size='lg' input onChange={e => changeHandler(e)}type='password' name='password' placeholder='re-enter your password' value={password} />
                </Form.Group><br/>

            <Button className='register' variant='primary' type='submit'>Create!</Button>
            <p className='login-link'>Already a user?<Link to={'/login'}>Click here!</Link></p>
            </Form>
        </Col>

        <Col>
            <div className='register-right'>
                <img className='register-img' src='img/register.png' alt='Register Img' />
            </div>
        </Col>
    </Row>
    
export default Register;