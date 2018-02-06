import React, { Component } from 'react';
import Header from './Header';
import axios from "axios";
import TestForm from './TestForm';
import ListSidebar from './ListSidebar';

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
            .then( res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Header/>
                <ListSidebar
                    travelList={this.state.travelList}
                />
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
