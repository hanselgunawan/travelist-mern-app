import React, { Component } from 'react';
import Header from './Header';
import axios from "axios";
import Geolocation from './Geolocation';
import TestForm from './TestForm';
var querystring = require('querystring');

class App extends Component {
    state = {
        listTitle:"",
        listSubtitle:"",
        listDescription:"",
        places:[],
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
        console.log("List Title: " + this.state.listTitle);
        console.log("List Subtitle: " + this.state.listSubtitle);
        console.log("List Description: " + this.state.listDescription);
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

    insertNewCard = key => {
        let myDate = new Date();
        axios.post("/insert/" + key,
            JSON.stringify({
                title: this.state.listTitle,
                subtitle: this.state.listSubtitle,
                description: this.state.listDescription,
                img: "",
                tags:[],
                userID:"1",
                userName:"Hallo",
                userIcon:"",
                publishedDate: myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate(),
                lastUpdated: myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate(),
                listCategory:this.state.places.types[0],
                listIcon:this.state.places.types[0],
                places:[
                    {
                        placeTitle:this.state.places.name,
                        placeDescription:"apa sih?",
                        placeName:this.state.places.name,
                        placeLatitude:this.state.places.geometry.location.lat,
                        placeLongitude:this.state.places.geometry.location.lng,
                        placeAddress:this.state.places.formatted_address,
                        placePhone:this.state.places.formatted_phone_number,
                        placeImage:[]
                    }
                ]
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
            console.log(response);
        });
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
                <TestForm
                    listTitle={this.state.listTitle}
                    listSubtitle={this.state.listSubtitle}
                    listDesc={this.state.listDescription}
                    handleInputChange={this.handleInputChange}
                    insertNewCard={this.insertNewCard}
                />
            </div>
        );
    }
}

export default App;
