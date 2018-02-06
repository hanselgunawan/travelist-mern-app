import axios from "axios";

const API_KEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + API_KEY + "&q=";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
    search: function(searchQuery, startYear, endYear) {
        if(startYear!==0)
        {
            searchQuery += "&begin_date=" + startYear + "0101";
        }
        if(endYear!==0)
        {
            searchQuery += "&end_date=" + endYear + "0101";
        }
        return axios.get(BASEURL + searchQuery);
    }
};