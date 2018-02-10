import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import Header from './Header';
import axios from "axios";
import Geolocation from './Geolocation';
import TestForm from './TestForm';
import Add from './Add';
import Edit from './Edit';
import DisplayList from './DisplayList';
var querystring = require('querystring');

class App extends Component {
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

    changeEditStatus = () => {
        this.setState({
            edit:true
        });
    };

    render() {
        return (
            <div>
                <DisplayList />
                {/*<Edit />*/}
                {/*<Add />*/}
                {/*<Header/>*/}
                {/*<Geolocation*/}
                    {/*fetchLocationDetails={this.fetchLocationDetails}*/}
                {/*/>*/}
                {/*<ListSidebar*/}
                    {/*travelList={this.state.travelList}*/}
                {/*/>*/}
                {/*<TestForm*/}
                    {/*listTitle={this.state.listTitle}*/}
                    {/*listSubtitle={this.state.listSubtitle}*/}
                    {/*listDesc={this.state.listDescription}*/}
                    {/*handleInputChange={this.handleInputChange}*/}
                    {/*insertNewCard={this.insertNewCard}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default App;
