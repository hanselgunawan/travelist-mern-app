import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import Header from './Header';
import axios from "axios";
import Geolocation from './Geolocation';
import TestForm from './TestForm';
import Add from './Add';
import Edit from './Edit';
import DisplayList from './DisplayList';
import EditListView from './EditListView';
import ListView from './ListView'
import MyList from './MyList';

var querystring = require('querystring');

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <MyList />
                {/*<ListView list_id="5a7ecb3e966c124ef97d5bf6"/>*/}
                {/*<ListView list_id='5a7eaa7b966c124ef97d5bf4'/>*/}
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
