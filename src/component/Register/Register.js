import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Register.css'

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
        return (
            <div>
                <h1 class='message is-large'>Register your account</h1>
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
        <div class ='field'>
            <p class='control has-icons-left has-icons-right'>
                <input class='input is-large' onChange={e => changeHandler(e)}type='text' name='username' placeholder='Username' value={username} />
                <span class='icon is-medium is-left'>
                    <i class='far fa-smile'></i>
                </span>
            </p>
        </div>
        <div class='field'>
            <p class='control has-icons-left'>
                <input class='input is-large' onChange={e => changeHandler(e)}type='password' name='password' placeholder='Password' value={password} /><br/>
                <span class='icon is-medium is-left'>
                    <i class='fas fa-lock'></i>
                </span>
            </p>
        </div>
        <button class='button is-link' type='submit'>Submit</button>
    </form>

export default Register;