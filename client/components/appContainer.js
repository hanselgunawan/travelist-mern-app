import React, { Component } from 'react';
import Header from './Header';
import axios from "axios";
import Geolocation from './Geolocation';

class App extends Component {
    state = {
        places:{},
        travelList:[]
    };

    componentDidMount() {
        this.fetchTravelList();
    }

    handleInputChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    fetchTravelList = () => {
        axios.get("/getAll")
            .then( res => this.setState({ travelList:res.data }))
            .catch(err => console.log(err));
    };

    fetchLocationDetails = suggest => {
        if(suggest)
        {
            console.log("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI");
            axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            .then(res => {
                this.setState({places:res.data.result});
                console.log(this.state.places);
            })
            .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <Geolocation
                    fetchLocationDetails={this.fetchLocationDetails}
                />
                {/*<ListSidebar*/}
                    {/*travelList={this.state.travelList}*/}
                {/*/>*/}
                {/*<TestForm*/}
                {/*listTitle={this.state.listTitle}*/}
                {/*listDesc={this.state.listDesc}*/}
                {/*handleInputChange={this.handleInputChange}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default App;
