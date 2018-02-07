import React from 'react'
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

class Geolocation extends React.Component {

    render() {
        var fixtures = [
            {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
            {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
            {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
        ];

        return (
            <div>
                <Geosuggest
                    ref={el=>this._geoSuggest=el}
                    placeholder="Start typing!"
                    initialValue="Hamburg"
                    fixtures={fixtures}
                    onSuggestSelect={this.fetchLocationDetails}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20" />

                <button onClick={()=>this._geoSuggest.selectSuggest()}>Search</button>
            </div>
        )
    }

    fetchLocationDetails(suggest) {
        console.log("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI");
        axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+suggest.placeId+"&key=AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI", {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
};

export default Geolocation