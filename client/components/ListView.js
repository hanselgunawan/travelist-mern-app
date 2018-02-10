import React, { Component } from 'react';
import ReactMapboxGl, {Popup, Layer, Feature} from "react-mapbox-gl";
import { Button, Card, Icon, Label, Reveal, Image} from 'semantic-ui-react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'
import './App.css';
import Header from './Header'
import List from './List/List';
import turf from 'turf';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYW5kcmVndW5hd2FuIiwiYSI6ImNqZDEyc3kwdDJkd24yeW5zOHNkN2owNmUifQ.jMGPgfB8vFmXclxuVHU1HQ"
});

class ListView extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			map: null,
			counter: 0,
			coordinates: [],
			bounds: null,
			activePlace: null,
			baseZoom: 10,
			listData: {
	  				title: "22 Places to Really Have Fun",
	  				subtitle: "From classic to new school, the best places to get burgers in Los Angeles",
	  				description: "Hamburgers are truly America's food, born of the country's fascination with beef amidst the 1950's commoditization of farming. Those same mid-century decades also spawned the rise of the nation's modern highway systems and LA's fast food culture in general, making the lowly hamburger something to be sought out as a destination or grabbed quickly on the way home. There's also no convenient diagram for what makes a perfect Los Angeles burger. Some hew close to the Southern California standard, with thin griddled patties, fresh toppings, American cheese, and a slightly tangy spread. Others stack multiple massive patties together for a bit of primal indulgence, while still more trade in mayonnaise for foie gras-inflected bordelaise sauce. Here now, the essential Los Angeles burgers.",
	  				img: "https://cdn.vox-cdn.com/thumbor/RYhXk8-Iz0uuqSy8WRO7Xmaaujo=/0x0:2000x1335/620x465/filters:focal(797x574:1117x894):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56759467/2017_09_19_oinkster_015.1505855774.jpg",
	  				tags: ["burgers", "Los Angeles", "food", "junk food"],
	  				userID: "1",
	  				userName: "Gordon Ramsay",
	  				userIcon: "",
	  				publishedDate: "Jan 25, 2018",
	  				lastUpdated: "Jan 25, 2018",
	  				ListCategory: "Food",
	  				ListIcon: "food",
	  				places:
	  				[
	  					{placeTitle: "Connie and Ted's",
	  					 placeDescription: "There’s no secret to Connie and Ted’s burger standby at this West Hollywood seafood restaurant is a well-built option simply made with quality ingredients. That translates to Hook’s four-year-old cheddar, pickles, onion, lettuce, and 1000 Island dressing.",
	  					 placeName: "Connie and Ted's",
	  					 placeLongitude: 34.0912,
	  					 placeLatitude: -118.3672,
	  					 placeAddress: "8171 California State Route 2, West Hollywood, CA 90046",
	  					 placePhone: "(323) 848-2722",
	  					 placeImage: ["https://cdn.vox-cdn.com/thumbor/Dr7nZzhEC_iO9BQt6U6pWhuoleM=/0x0:960x720/620x465/filters:focal(404x284:556x436):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56761569/20139740_1428947243860321_5679017174696933702_n.0.jpg", "https://cdn.vox-cdn.com/thumbor/Qi4xoWoWXWQVC5YEWfO_aq_z0JM=/0x0:595x547/620x465/filters:focal(251x227:345x321):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56761573/Screen_Shot_2017_09_19_at_1.20.18_PM.0.png", "https://cdn.vox-cdn.com/thumbor/wZVt65iCtG3HN8x32f-5IOBhl4Q=/0x0:1000x750/620x465/filters:focal(420x295:580x455):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56761575/o.0.jpg"]
	  					},
	  					{placeTitle: "Cassell's Hamburgers",
	  					 placeDescription: "Koreatown’s Cassell’s is a history lesson in real time. Hanging signage recalls the longtime former location not far away, though today’s iteration inside the Hotel Normandie is a glossy reminder that times change. Thankfully the well-griddles burgers are as sturdy as ever, lovingly overseen by burger whisperer Christian Page.",
	  					 placeLongitude: 34.0634,
	  					 placeLatitude: -118.3005,
	  					 placeName: "Cassell's Hamburgers",
	  					 placeAddress: "3600 W 6th St, Los Angeles, CA 90020",
	  					 placePhone: "(213) 387-5502",
	  					 placeImage: ["https://cdn.vox-cdn.com/thumbor/WV12QR3HibhWMbFIKyAzmxd3Fak=/0x0:1600x1067/620x465/filters:focal(268x344:524x600):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/58538959/CASSELLS_Cheeseburger3.0.jpg", "https://cdn.vox-cdn.com/thumbor/-OycY6IP8koXBkQtjgUeA41pzvE=/0x0:900x600/620x465/filters:focal(378x228:522x372):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56761579/everson-royce-bar.0.0.jpeg"]
	  					},
	  					{placeTitle: "Father's Office",
	  					 placeDescription: "Who knew a burger could be so polarizing? Yet here is the Father’s Office burger, a no-ketchup-allowed option served on a split roll and topped with caramelized onions and lots of arugula. This massive sandwich uses dry-aged beef and maytag blue cheese for a remarkably different kind of burger.",
	  					 placeLongitude: 34.0293,
	  					 placeLatitude: -118.4984,
	  					 placeName: "Father's Office",
	  					 placeAddress: "3229 Helms Ave, Los Angeles, CA 90034",
	  					 placePhone: "(310) 736-2224",
	  					 placeImage: ["https://cdn.vox-cdn.com/thumbor/Il1LSJs89pZ_FF0Z8AUuf7kHMEM=/0x0:1000x813/620x465/filters:focal(420x327:580x487):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56761587/o.0.jpg"]
	  					}
	  				]}
		}
	}

    

    componentDidMount(){
		
		// //Get COORDS
		// let coords = [];
		// this.state.listData.places.forEach(v => {
		//   coords.push([v.placeLatitude, v.placeLongitude]);
		// })
		// //Set STATE COORDS
		// this.setState({coordinates: coords}, () => {
		// 	const line = turf.lineString(this.state.coordinates);
		// 	const bbox = turf.bbox(line);
		// 	const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
		// 	this.setState({bounds: bounds}, this.titleHover())
		// 	console.log(this.state.bounds)
		// })

		this.fetchTravelList();	
	};

	setActivePlace(name, address, latitude, longitude){
		this.setState({
			activePlace: {
				title: name,
				description: address,
				coords: [latitude, longitude]
			}
		})
	}

	fetchTravelList = () => {
        axios.get("/getAll/"+this.props.match.params.listID)
            .then( res => {
                this.setState({listData: res.data[0]}, () => {
                	console.log(this.state.listData)
					//Get COORDS
					let coords = [];
					this.state.listData.places.forEach(v => {
					  coords.push([v.placeLatitude, v.placeLongitude]);
					})
					//Set STATE COORDS
					this.setState({coordinates: coords}, () => {
						let line = turf.lineString(this.state.coordinates);
						let bbox = turf.bbox(line);
						let bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];

						this.setState({bounds: bounds}, this.titleHover())
					})
                });
            })
            .catch(err => console.log(err));
    };


	placeHover(latitude, longitude){
		if (this.state.map != null)
		{
			this.state.map.flyTo({center: [latitude, longitude], offset:[300, 0], zoom: this.state.baseZoom+2})
		}
	};

	titleHover(){
		if (this.state.bounds != null){
			this.state.map.fitBounds(this.state.bounds, {padding: 120, offset: [250, 0]})
		}
	};

	render() {
		return (
			<div>
				<Header />
				<List data={this.state.listData} setActivePlace={this.setActivePlace.bind(this)} placeHover={this.placeHover.bind(this)} titleHover={this.titleHover.bind(this)}/>
				<Map fitBounds={this.state.bounds} fitBoundsOptions={{padding: 100, offset:[300, 0]}} style="mapbox://styles/andregunawan/cjdflzkfd13bl2rsf762f8bi2" containerStyle={{height: "100vh",width: "100vw"}} onStyleLoad={(map) => {this.setState({map: map}); map.loadImage("https://cdn.iconscout.com/public/images/icon/free/png-512/pin-locate-marker-location-navigation-383aa35b87c3e671-512x512.png", (err, img) => {map.addImage('pinnn', img);})}}>
		  			<Layer 
		      			type="symbol"
		      			id="marker"
		      			layout={{ "icon-image": 'pinnn', 'icon-size': 0.075, 'text-allow-overlap': true, 'icon-allow-overlap': true
		      				}}>
		      			{this.state.coordinates.map(v => (
		        			<Feature coordinates={v}/>
		      			))}
		    		</Layer>
		    		{this.state.activePlace != null ? (<Popup coordinates={this.state.activePlace.coords} offset={{'bottom-left': [12, -38],  'bottom': [0, -20], 'bottom-right': [-12, -38]}}>
		  				<h2>{this.state.activePlace.title}</h2>
					</Popup>) : null}
		  		</Map>
		  	</div>
	  	)
	}
}

export default ListView;