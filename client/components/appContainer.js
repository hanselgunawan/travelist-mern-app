import React, { Component } from 'react';
import Header from './Header';
import axios from "axios";
import TestForm from './TestForm';
import ListSidebar from './ListSidebar';
import Geolocation from './Geolocation';

class App extends Component {
    state = {
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

    render() {
        return (
            <div>
                <Header/>
                <Geolocation/>
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
