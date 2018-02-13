import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import ListForm from './ListForm';
import PlaceForm from './PlaceForm';
import EditPlaceCard from './EditPlaceCard/EditPlaceCard';
import EditTitleCard from './EditTitleCard/EditTitleCard';
import "./add-form.css"
import Header from './Header'
var querystring = require('querystring');
let myDate = new Date();

import ReactMapboxGl, {Popup, Layer, Feature} from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import turf from 'turf';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYW5kcmVndW5hd2FuIiwiYSI6ImNqZDEyc3kwdDJkd24yeW5zOHNkN2owNmUifQ.jMGPgfB8vFmXclxuVHU1HQ"
});

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
        geolocation:[],
        locations: []
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
        this.setState({travelList: myArr})
        this.setState({locations: [...this.state.locations, []]});

        // console.log(this.state.travelList);
    };

    deletePlace(key){
        let _travelList = this.state.travelList;
        _travelList.places.splice(key, 1);
        this.setState({
            travelList: _travelList
        });

        let _loc = this.state.locations;
        _loc.splice(key, 1);
        this.setState({locations: _loc}, this.fitMap());
    };

    fitMap()
    {
        if (this.state.locations.length > 1){
            let line = turf.lineString(this.state.locations);
            let bbox = turf.bbox(line);
            let bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]; 
            this.state.map.fitBounds(bounds, {padding: 120, offset: [250, 0]})
        }
        else if (this.state.locations.length == 1)
        {
            this.state.map.flyTo({center: this.state.locations[0], offset:[300, 0], zoom: 13})
        }
    }

    fetchLocationDetails = (suggest,key) => {
        if(suggest)
        {
            console.log("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI");
            axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI", {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then(res => {
                    this.setState({geolocation:res.data.result});
                    let myArr = this.state.travelList;
                    myArr.places[key].placeName = this.state.geolocation.name;
                    myArr.places[key].placeLatitude = this.state.geolocation.geometry.location.lng;
                    myArr.places[key].placeLongitude = this.state.geolocation.geometry.location.lat;
                    myArr.places[key].placeAddress = this.state.geolocation.formatted_address;
                    myArr.places[key].placePhone = this.state.geolocation.formatted_phone_number;
                    this.setState({travelList: myArr});
                    console.log(this.state.geolocation);

                    let _locations = this.state.locations;
                    _locations[key] = [this.state.geolocation.geometry.location.lng, this.state.geolocation.geometry.location.lat];
                    this.setState({locations: _locations}, () => {
                        console.log(this.state.locations);
                        this.fitMap();
                    });

                })
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div>
            <Header />
            <div className="container-fluid add-form-div">
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
                        handleInputImageChange={this.handleInputImageChange.bind(this)} 
                        deletePlace={this.deletePlace.bind(this)}/>
                    )
                    : null
                }

                <Button.Group fluid size="huge" className="add-btn-div">
                    <Button onClick={this.addNewPlace}>Add Place</Button>
                    <Button onClick={this.insertNewCard}><Link to="/">Save List </Link></Button> 
                </Button.Group>

            </div>
            <Map style="mapbox://styles/andregunawan/cjdflzkfd13bl2rsf762f8bi2" containerStyle={{height: "100vh",width: "100vw"}} onStyleLoad={(map) => {this.setState({map: map}); map.loadImage("https://cdn.iconscout.com/public/images/icon/free/png-512/pin-locate-marker-location-navigation-383aa35b87c3e671-512x512.png", (err, img) => {map.addImage('pinnn', img);})}}>
                    <Layer 
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": 'pinnn', 'icon-size': 0.1, 'text-allow-overlap': true, 'icon-allow-overlap': true
                            }}>
                        {this.state.locations.length > 0 ? this.state.locations.map(v => (
                            <Feature coordinates={v}/>
                        )) : null}
                    </Layer>
            </Map>
            </div>
        );
    }
}

export default Add;
