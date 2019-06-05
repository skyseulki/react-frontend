import React, { Component } from 'react';
import Restaurants from '../Restaurants/Restaurants'


class RestaurantsContainer extends Component {
    constructor(){
        super();

        this.state = {
            restaurants: []
            // will hold all of our restaurants from our json api
        }
    }
    componentDidMount(){
        this.getRestaurants()
    }

    getRestaurants = async () => {
        try {
            const restaurants = await fetch('/api/v1/restaurants');
            if(!restaurants.ok){
                throw Error(restaurants.response.statusText);
            }
            const restaurantsParsed = await restaurants.json();
            this.setState({restaurants: restaurantsParsed.data})
            // console.log(restaurantsParsed.data)
        } catch(err){
            return err
        }
    }
    render(){
        const { restaurants } = this.state
        const { currentUser } = this.props
        return(
            <div>
                <Restaurants doSetCurrentUser={this.props.doSetCurrentUser} restaurants={ restaurants } currentUser={currentUser}/>
            </div>
        )
    }
}

export default RestaurantsContainer;