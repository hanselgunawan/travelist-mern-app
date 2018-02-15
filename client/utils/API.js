import axios from "axios";

const API_KEY = "AIzaSyAZ-CwVxjEd2hGyIKbXzgx9A7ZdowjuYFI";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
    findPlace: function(placeId) {
        const BASEURL = "http://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key=" + API_KEY;
        return axios.get(BASEURL);
    }
};