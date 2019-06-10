import React, { Component } from 'react';
import Restaurants from '../Restaurants/Restaurants';
import './RestaurantsContainer.css';


const CHOICES = ['Food', 'Restaurant', 'Dessert', 'Museum', 'Live Bars']
class RestaurantsContainer extends Component {
    constructor(){
        super();

        this.state = {
            term: '',
            activity: 'Choose a category',
            toggle: false,
            restaurants: [],
            restToggle: false
            // will hold all of our restaurants from our json api
        }
    }
    componentDidMount(){
        // this.getSelection()
    }

    getSelection = async () => {
        try {
            const selection = await fetch('/api/v1/restaurants', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            if(!selection.ok){
                throw Error(selection.response.statusText);
            }
            const selectionParsed = await selection.json();
            this.setState({
                restaurants: selectionParsed.data,
                restToggle: true
            })
        } catch(err){
            return err
        }
    }

    // activity = () => {
    //     return ['Food', 'Restaurant', 'Dessert', 'Museum', 'Live Bars']
    // }

    toggleHandler = () => {
        this.setState({
            toggle: true
        })
    }

    toggleOff = (e) => {
        this.setState({
            toggle: false,
            activity: e.target.innerText
            // term: e.target.innerText
        })
    }

    doSelectChoice = term =>
        this.setState({
            term
        })

    

    render(){
        const classList = this.state.restToggle ? "" : "search-box";
        return (
        <div className='search-wrapper'>
            <div className={classList}>
                <div onClick={this.toggleHandler}>{this.state.activity}</div>
                {/* {this.state.toggle &&  */}
                <select className="dropDown" onChange={(e) => this.doSelectChoice(e.target.value)}>
                    {CHOICES.map((a,i)=> {
                        return <option  value={a} key={i}>{a}</option>
                    })}
                </select>
            {/* } */}
                <button onClick={this.getSelection}>Submit</button>
            </div>
            {
                this.state.restToggle &&
                <Restaurants 
                doSetCurrentUser={this.props.doSetCurrentUser} 
                restaurants={this.state.restaurants} 
                currentUser={this.props.currentUser}
                />
            }
            
        </div>
        )
    }
}

export default RestaurantsContainer;