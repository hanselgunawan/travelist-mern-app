import React from 'react'
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

class Geolocation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Geosuggest
                    ref={el=>this._geoSuggest=el}
                    placeholder="Search location..."
                    initialValue={this.props.placeName}
                    onSuggestSelect={this.props.fetchLocationDetails}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20" />
            </div>
        )
    }
};

export default Geolocation