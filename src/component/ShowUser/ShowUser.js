import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'


class ShowUser extends Component {
    state = {
        user: {}
    }
    

    componentDidMount() {
        this.doGetUser()
        .then(({user}) => this.setState({user}))
    }

    doGetUser = async () => {
        try {
            const user = await fetch(`/users/${this.props.match.params.id}`)
            const parsedUser = await user.json()
            return parsedUser

        } catch(err) {
            console.log(err)
        }
    } 

    deleteRestaurant = async (id, e) => {
        try {
            const removeRestaurant = await fetch(`/users/${this.props.match.params.id}/restaurants/${id}`,
            {
                method: 'DELETE'
            });
            const removeRestaurantJson = await removeRestaurant.json();
            this.setState({
                user: removeRestaurantJson.user
            });

        } catch(err){
            console.log(err)
        }
    };

    render() {
        return (
            <div>
                <h1>Hello, {this.state.user.username}</h1>
                <Link to={'/'}>Edit Profile</Link>
                {this.state.user.restaurants && this.state.user.restaurants.map((r,i) => 
                    <li>
                        {/* <a href={r.url}>{r.name}</a> */}
                        <Link to={r.url}>{r.name}</Link>
                        <button onClick={() => this.deleteRestaurant(r.id)}>Delete</button>
                    </li>
                )}
            </div>
        )
    }
}


export default withRouter(ShowUser);