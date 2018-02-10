import React, { Component } from 'react';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from './Header';
import axios from "axios";
import Geolocation from './Geolocation';
import TestForm from './TestForm';
import Add from './Add';
import Edit from './Edit';
var querystring = require('querystring');

class DisplayList extends Component {
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
            publishedDate: "",
            lastUpdated: "",
            listCategory:"",
            listIcon:"",
            places:[]
        },
        edit:false
    };

    componentDidMount() {
        this.fetchTravelList();
    }

    fetchTravelList = () => {
        axios.get("/getAllList/1")
            .then( res => {
                this.setState({ travelList:res.data });
                console.log(this.state.travelList);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                { this.state.travelList.length>0
                    ? this.state.travelList.map((data, key) =>
                        <div>
                            <p>{key+1}</p>
                            <Link to="/add">Add</Link>
                            <Link to={`/roster/${data.number}`}>Edit</Link>
                        </div>
                    )
                    : <p>No list to display</p>
                }
            </div>
        );
    }
}

export default DisplayList;