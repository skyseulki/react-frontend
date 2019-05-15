import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    state = {
        username: '',
        password: '',
        logged: false
    }

    changeHandler = e => {
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
        console.log(parsedResponse)
        //parsedResponse.success
        if(parsedResponse.user){ 
            this.props.doSetCurrentUser(parsedResponse.user)
                this.setState({
                    logged: true
                })
        }
    };

    render(){
        // console.log(this.state)
        const { username, password } = this.state
        return(
            <div>
                <h1>Register your account</h1>
                {
                    this.state.logged
                    ? <Redirect to={`/users/${this.props.currentUser._id}`} />
                    : <RegisterForm 
                        changeHandler={this.changeHandler}
                        onSubmit={this.onSubmit}
                        username={username}
                        password={password}
                    />
                }
            </div>
        )
    }
}

const RegisterForm = ({ changeHandler, onSubmit, username, password }) => 
    <form onSubmit={e => onSubmit(e)}>
        <label htmlFor='username'>Username</label>
        <input onChange={e => changeHandler(e)}type='text' name='username' placeholder='Username' value={username} />
        <label htmlFor='password'>Password</label>
        <input onChange={e => changeHandler(e)}type='password' name='password' placeholder='Password' value={password} />
        <button type='submit'>Submit</button>
    </form>

export default Register;