import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { thisExpression } from '@babel/types';


class ShowUser extends Component {
    state = {
        // user: {},
        show: false,
        username: ''
    }

    showModal = () => {
        this.setState({
            show: true
        })
    }
    
    hideModal = () => {
        this.setState({
            show: false
        })
    }

    // componentDidMount() {
    //     this.doGetUser()
    //     .then(({user}) => this.setState({user}))
    // }

    doGetUser = async () => {
        try {
            const user = await fetch(`/users/${this.props.match.params.id}`)
            const parsedUser = await user.json()
            return parsedUser

        } catch(err) {
            console.log(err)
        }
    } 

    deleteRes = (e) => {
        // console.log(e.currentTarget.value)
        this.props.delRestaurants(e.currentTarget.value)
    }

    // deleteRestaurant = async (id, e) => {
    //     try {
    //         const removeRestaurant = await fetch(`/users/${this.props.match.params.id}/restaurants/${id}`,
    //         {
    //             method: 'DELETE',
    //             credentials: 'include'

    //         });
    //         const removeRestaurantJson = await removeRestaurant.json();
    //         // this.props.doSetCurrentUser(removeRestaurantJson)
    //         this.setState({
    //             user: removeRestaurantJson.user
    //         });
    //         console.log(removeRestaurantJson)

    //     } catch(err){
    //         console.log(err)
    //     }
    // };

        
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    
    updateUser = async (e) => {
        e.preventDefault();
        const updatedUser = await fetch(`/users/${this.props.match.params.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({ username: this.state.username }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const updateUserJson = await updatedUser.json()
        console.log(updateUserJson.updateUser)
        this.props.doSetCurrentUser(updateUserJson.updateUser)
        this.setState({
            show: false
        })
        // this.props.history.push('/')
    }

    render() {
        const { allRestaurant } = this.props
        return (
            <div>
                <h1>Hellllllo, {this.props.currentUser && this.props.currentUser.username}</h1>
                <main>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <form onSubmit={(e) => this.updateUser(e)}>
                            <input onChange={this.changeHandler} type='text' name='username' placeholder='username'
                            value={this.state.username} />
                            <button type='submit'>Update!</button>
                        </form>
                    </Modal>
                    {
                        (this.props.currentUser && this.props.currentUser._id === this.props.match.params.id)
                            && <button onClick={this.showModal}>Edit Profile</button>
                    }
                </main>
                {allRestaurant.map((r,i) => 
                    <li>
                        {/* <a href={r.url}>{r.name}</a> */}
                        <Link to={r.url}>{r.name}</Link>
                        <button value={r._id} onClick={this.deleteRes}>Delete</button>
                    </li>
                )}
            </div>
        )
    }
}


export default withRouter(ShowUser);