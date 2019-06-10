import React, { Component } from 'react';
import './Restaurants.css';
import styled from 'styled-components';

const CardStyle = styled.div`

    h3 {
        // color: red;
    }
`



class Restaurants extends Component {
    // passing down the restaurants as props from the RestaurantContainer
    // we can loop over it using '.map' method
    doAddResturant = async (id, name) => {
        const { currentUser } = this.props

        const addRestaurant= await fetch('/restaurants', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ id, name, currentUser }),
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
                <CardStyle> 
        
                        <div className="restaurant-wrapper" key={i}>
                            <span><a className='list-link' href={restaurant.url}>{restaurant.name}</a>  {restaurant.price}</span><br/>
                            <div className="wrapper"><img src={restaurant.image_url} className="restaurant"></img></div><br/>
                            <small>• {restaurant.categories.map((c, idx) => <span key={idx}> {c.title} • </span>)}</small><br/>
                            {
                                this.props.currentUser
                                    && !this.props.currentUser.restaurants.some(r => r.id === restaurant.id) && <button onClick={() => this.doAddResturant(restaurant.id, restaurant.name)} className="btn">Add</button>
                            }<br/>
                        </div>
                            
                </CardStyle>
            )
        })
        return (
            <CardStyle>
                    <h3>Los Angeles, CA</h3>
                    <div className="rest-item">
                        {restaurantsList}
                    </div>
            </CardStyle>
        )
        
    }
};

export default Restaurants;