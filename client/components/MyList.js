import React, { Component } from 'react';
import axios from "axios";
import { Button, Card, Icon, Image, Label} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Carousel from './Carousel/Carousel.js'
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './Header'
import ListForm from './ListForm';
import PlaceForm from './PlaceForm';
import './mylist.css'
var querystring = require('querystring');


import ReactMapboxGl, {Popup, Layer, Feature} from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import turf from 'turf';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYW5kcmVndW5hd2FuIiwiYSI6ImNqZDEyc3kwdDJkd24yeW5zOHNkN2owNmUifQ.jMGPgfB8vFmXclxuVHU1HQ"
});


class MyList extends Component {
    state = {
        travelList: null,
        coords_arr: [],
        activeList: 0
    };

    componentDidMount() {
        this.fetchTravelList();
    }

    fetchTravelList = () => {
        axios.get("/getAllList/1")
            .then( res => {
                this.setState({ travelList:res.data });
                console.log(this.state.travelList);
                let coords_arr = [];
                this.state.travelList.forEach(v => {
                    let coords = [];
                    v.places.forEach(vv => {
                        coords.push([vv.placeLatitude, vv.placeLongitude])
                    })
                    coords_arr.push(coords);
                })
                console.log(coords_arr)
                this.setState({coords_arr: coords_arr})
            })
            .catch(err => console.log(err));
    };

    listHover(index)
    {
        this.setState({activeList: index});
        let line = turf.lineString(this.state.coords_arr[index]);
        let bbox = turf.bbox(line);
        let bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]; 
        this.state.map.fitBounds(bounds, {padding: 120, offset: [250, 0]})
    }

    render() {
        return (
            <div>
            <div className="myList" >
                { this.state.travelList !== null ? this.state.travelList.map((data, key) =>
                    <div id={"list-"+data._id} onMouseOver={() => {this.listHover(key)}} className="card-size title-card">
                        <div className="fluid ui card orange">
                            <div className="content">
                                <div className="details">
                                    <h1 className="heading title-heading">{data.title}</h1>
                                    <h2 className="description">{data.subtitle}</h2>
                                    <Image src='http://pm1.narvii.com/6584/02ad0b86f0010ec9806f6e428fd35bfc7f2efc57_128.jpg' avatar />
                                    <span> &nbsp; by {data.userName} &nbsp;|&nbsp; Updated on {data.lastUpdated}</span>
                                    <br/><br/>
                                    <div className="right aligned">
                                        {data.tags.length > 0 ? data.tags.map(v => (
                                            <Label tag size="mini" as="a"> {v} </Label>
                                        )) : null}
                                    </div>

                                </div>
                            </div>
                            <Carousel  id={"carousel"+key} images={[data.img]}/>
                            <div className="row extra content no-gutters">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-right">
                                    <Link to={`/list/${data._id}`}>See List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <Map style="mapbox://styles/andregunawan/cjdflzkfd13bl2rsf762f8bi2" containerStyle={{height: "100vh",width: "100vw"}} onStyleLoad={(map) => {this.setState({map: map}); map.loadImage("https://cdn.iconscout.com/public/images/icon/free/png-512/pin-locate-marker-location-navigation-383aa35b87c3e671-512x512.png", (err, img) => {map.addImage('pinnn', img);})}}>
                    <Layer 
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": 'pinnn', 'icon-size': 0.1, 'text-allow-overlap': true, 'icon-allow-overlap': true
                            }}>
                        {this.state.coords_arr.length > 0 ? this.state.coords_arr[this.state.activeList].map(v => (
                            <Feature coordinates={v}/>
                        )) : null}
                    </Layer>
            </Map>
            </div>
        );
    }
}

export default MyList;