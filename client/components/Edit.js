import React, { Component } from 'react';
import axios from "axios";
import ListForm from './ListForm';
import PlaceForm from './PlaceForm';
var querystring = require('querystring');
let myDate = new Date();

class Edit extends Component {
    state = {
        travelList:{
            listTitle: "",
            listSubtitle: "",
            listDescription: "",
            listImg: "",
            listTags:[],
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

    componentDidMount() {
        this.fetchTravelList();
    }

    fetchTravelList = () => {
        axios.get("/getAll/5a7d7ab24b1d00d79aababf3")
            .then( res => {
                this.setState({ travelList:res.data[0] });
                console.log(res.data[0]);
            })
            .catch(err => console.log(err));
    };

    handleInputChangeList = event => {
        const travelListObj = this.state.travelList;
        let name = event.target.name;
        let value = event.target.value;
        travelListObj[name] = value;
        this.setState({
            travelListObj
        });
        console.log("List Title: " + this.state.travelList.listTitle);
        console.log("List Subtitle: " + this.state.travelList.listSubtitle);
        console.log("List Description: " + this.state.travelList.listDescription);
    };

    handleInputChangePlace = (event, key) => {
        const travelPlaceObj = this.state.travelList.places;
        let name = event.target.name;
        let value = event.target.value;
        travelPlaceObj[key][name] = value;
        this.setState({
            travelPlaceObj
        });
        console.log("Place Title: " + this.state.travelList.places[key].placeTitle);
        console.log("Place Description: " + this.state.travelList.places[key].placeDescription);
        console.log("Place Name: " + this.state.travelList.places[key].placeName);
        console.log("Place Latitude: " + this.state.travelList.places[key].placeLatitude);
        console.log("Place Longitude: " + this.state.travelList.places[key].placeLongitude);
        console.log("Place Address: " + this.state.travelList.places[key].placeAddress);
        console.log("Place Phone: " + this.state.travelList.places[key].placePhone);
    };

    updateList = () => {
        let myDate = new Date();
        axios.post("/update/5a7d7ab24b1d00d79aababf3",
            JSON.stringify(this.state.travelList), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
            console.log(response);
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

        console.log(this.state.travelList);
    };

    deletePlace = key => {
        let _travelList = this.state.travelList;
        _travelList.places.splice(key, 1);
        this.setState({
            travelList: _travelList
        });
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
                <ListForm
                    listTitle={this.state.travelList.listTitle}
                    listSubtitle={this.state.travelList.listSubtitle}
                    listDescription={this.state.travelList.listDescription}
                    listImg={this.state.travelList.listImg}
                    listCategory={this.state.travelList.listCategory}
                    handleInputChangeList={this.handleInputChangeList}
                />
                { this.state.travelList.places.length>0
                    ? this.state.travelList.places.map((data, key) =>
                        <PlaceForm
                            fetchLocationDetails={this.fetchLocationDetails}
                            placeId={key}
                            placeTitle={data.placeTitle}
                            placeDescription={data.placeDescription}
                            placeName={data.placeName}
                            handleInputChangePlace={this.handleInputChangePlace}
                            deletePlace={this.deletePlace}
                        />
                    )
                    : <p>No place to display</p>
                }
                <button onClick={this.addNewPlace}>Add Place</button>
                <button onClick={this.updateList}>Update</button>
            </div>
        );
    }
}

export default Edit;