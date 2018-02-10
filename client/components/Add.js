import React, { Component } from 'react';
import axios from "axios";
import ListForm from './ListForm';
import PlaceForm from './PlaceForm';
import EditPlaceCard from './EditPlaceCard/EditPlaceCard';
import EditTitleCard from './EditTitleCard/EditTitleCard';
var querystring = require('querystring');
let myDate = new Date();

const AddPlaceBtn = () => (
    <div class="add-card">
        <div class="ui fluid link card add-card">
            <div class="content">
                <h1 class="header center aligned">Add Card</h1>
            </div>
        </div>
    </div>
 )

class Add extends Component {
    state = {
        travelList:{
            title: "",
            subtitle: "",
            description: "",
            img: "",
            tags:[],
            userID:"1",
            userName:"Hansel",
            userIcon:"",
            publishedDate: myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate(),
            lastUpdated: myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate(),
            listCategory:"",
            listIcon:"",
            places:[]
        },
        geolocation:[]
    };

    handleInputChangeList = event => {
        const travelListObj = this.state.travelList;
        let name = event.target.name;
        let value = event.target.value;
        travelListObj[name] = value;
        this.setState({
            travelListObj
        });
        // console.log("List Title: " + this.state.travelList.listTitle);
        // console.log("List Subtitle: " + this.state.travelList.listSubtitle);
        // console.log("List Description: " + this.state.travelList.listDescription);
    };

    handleInputImageChange(key, img_arr)
    {
        const _travelList = this.state.travelList;
        _travelList.places[key].placeImage = img_arr;
        this.setState({"travelList": _travelList}, () => {
            console.log(this.state.travelList.places)
        });
    }

    handleInputImageChange2(img)
    {
        const _travelList = this.state.travelList;
        _travelList.img = img;
        this.setState({"travelList": _travelList}, () => {
            console.log(this.state.travelList.img)
        });
    }

    handleInputChangePlace = (event, key) => {
            const travelPlaceObj = this.state.travelList.places;
            let name = event.target.name;
            let value = event.target.value;
            travelPlaceObj[key][name] = value;
            console.log(event.target.value);
            this.setState({
                travelPlaceObj
            });
            // console.log("Place Title: " + this.state.travelList.places[key].placeTitle);
            // console.log("Place Description: " + this.state.travelList.places[key].placeDescription);
            // console.log("Place Name: " + this.state.travelList.places[key].placeName);
            // console.log("Place Latitude: " + this.state.travelList.places[key].placeLatitude);
            // console.log("Place Longitude: " + this.state.travelList.places[key].placeLongitude);
            // console.log("Place Address: " + this.state.travelList.places[key].placeAddress);
            // console.log("Place Phone: " + this.state.travelList.places[key].placePhone);
    };

    insertNewCard = () => {
        let myDate = new Date();
        axios.post("/insert",
            JSON.stringify(this.state.travelList), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
            // console.log(response);
        });
    };

    addNewPlace = () => {
        let placeObj = {
            placeTitle:"",
            placeDescription:"",
            placeName:"",
            placeLatitude:0,
            placeLongitude:0,
            placeAddress:"",
            placePhone:"",
            placeImage:[]
        };
        let myArr = this.state.travelList;
        myArr.places.push(placeObj);
        this.setState({travelList: myArr});

        // console.log(this.state.travelList);
    };

    fetchLocationDetails = (suggest,key) => {
        if(suggest)
        {
            console.log("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI");
            axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(res => {
                    this.setState({geolocation:res.data.result});
                    let myArr = this.state.travelList;
                    myArr.places[key].placeName = this.state.geolocation.name;
                    myArr.places[key].placeLatitude = this.state.geolocation.geometry.location.lat;
                    myArr.places[key].placeLongitude = this.state.geolocation.geometry.location.lng;
                    myArr.places[key].placeAddress = this.state.geolocation.formatted_address;
                    myArr.places[key].placePhone = this.state.geolocation.formatted_phone_number;
                    this.setState({travelList: myArr});
                    console.log(this.state.geolocation);
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <EditTitleCard 
                    title={this.state.travelList.title}
                    subtitle={this.state.travelList.listSubtitle}
                    description={this.state.travelList.description}
                    img={this.state.travelList.img}
                    category={this.state.travelList.category}
                    handleInputChangeList={this.handleInputChangeList}
                    handleInputImageChange={this.handleInputImageChange2.bind(this)}/>

                { this.state.travelList.places.length>0
                    ? this.state.travelList.places.map((data, key) =>
                    <EditPlaceCard 
                        fetchLocationDetails={this.fetchLocationDetails}
                        placeId={key}
                        placeTitle={data.placeTitle}
                        placeDescription={data.placeDescription}
                        handleInputChangePlace={this.handleInputChangePlace}
                        handleInputImageChange={this.handleInputImageChange.bind(this)} />
                    )
                    : <p>No place to display</p>
                }
                <button onClick={this.addNewPlace}>Add Place</button>
                <button onClick={this.insertNewCard}>Save</button>
            </div>
        );
    }
}

export default Add;
