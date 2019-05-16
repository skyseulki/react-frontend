import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css'

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
        const { username, password } = this.state
        return (
            this.state.logged
            ? <Redirect to={`/users/${this.props.currentUser._id}`} />
            : <form onSubmit={this.onSubmit}>
                <h1 class='message is-large'>Login</h1>
                <div class='field'>
                    <p class='control has-icons-left has-icons-right'>
                        <input class='input is-large' type='text' name='username' placeholder='Username' value={username} onChange={this.changeHandler} />
                        <span class='icon is-medium is-left'>
                            <i class='far fa-smile'></i>
                        </span>
                        <span class='icon is-medium is-right'>
                            <i class='fas fa-check'></i>
                        </span>
                    </p>
                </div>
                <div class='field'>
                    <p class='control has-icons-left'>
                        <input class='input is-large' type='password' name='password' placeholder='Password' value={password} onChange={this.changeHandler} />
                        <span class='icon is-medium is-left'>
                            <i class='fas fa-lock'></i>
                        </span>
                    </p>
                </div>
                <button class="button is-link" type='submit'>Submit</button><br/>
                {
                    this.state.message
                }
            </form>
        )
    };
};

export default Login;