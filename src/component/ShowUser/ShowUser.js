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
            // https://api.yelp.com/v3/businesses/${this.props.match.params.id}
            const parsedUser = await user.json()
            return parsedUser

        } catch(err) {
            console.log(err)
        }
    } 
    render() {
        return (
            <div>
                <h1>Hello, {this.state.user.username}</h1>
                {this.state.user.restaurants && this.state.user.restaurants.map((r,i) => 
                    <li>
                        <Link to={`/restaurants/${r.id}`}>{r.name}</Link>
                    </li>
                )}
            </div>
        )
    }
}

export default withRouter(ShowUser);