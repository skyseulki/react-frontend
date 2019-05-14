import React, { Component } from 'react';
import './Restaurants.css'


class Restaurants extends Component {
    // passing down the restaurants as props from the RestaurantContainer
    // we can loop over it using '.map' method
    doAddResturant = async (id, name) => {
        const { currentUser } = this.props
        const addRestaurant= await fetch('/restaurants', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({id, name, currentUser}),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const userJson = await addRestaurant.json()
        this.props.doSetCurrentUser(userJson.user)
    }

    render () {
        const restaurantsList = this.props.restaurants.map((restaurant, i) => {
            return(
                <li key={i}>
                    <span><a href= {restaurant.url}>{restaurant.name}</a></span><br/>
                    <small>{restaurant.categories.map((c, idx) => <span key={idx}>{c.title}</span>)}</small>
                    <img src={restaurant.image_url}></img>
                    {
                        this.props.currentUser
                            && !this.props.currentUser.restaurants.some(r => r.id === restaurant.id) && <button onClick={() => this.doAddResturant(restaurant.id, restaurant.name)}>Add</button>
                    }
                </li>)
        })
        return (
            <div>
                <h3>All restaurants in Los Angeles, CA</h3>
                <ul>
                    {restaurantsList}
                </ul>
            </div>
        )
    }
};

export default Restaurants;