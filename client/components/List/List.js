import React, { Component } from 'react';
import TitleCard from '../TitleCard/TitleCard';
import PlaceCard from '../PlaceCard/PlaceCard';
import "./styles.css";

const List = (props) => 
(
	<div className="List">
	 <div onMouseOver={() => {props.titleHover()}}>
     	<TitleCard title={props.data.title} subtitle={props.data.subtitle} image={props.data.img} userName={props.data.userName} userIcon={props.data.userIcon} updated={props.data.lastUpdated} description={props.data.description} tags={props.data.tags} ListCategory={props.data.ListCategory} ListIcon={props.data.ListIcon}/>
     </div>
     {props.data.places.map((p, i) => 
	     (
	     	<div onMouseOver={() => {props.placeHover(p.placeLatitude, p.placeLongitude); props.setActivePlace(p.placeName, p.placeAddress, p.placeLatitude, p.placeLongitude);}}>
	     		<PlaceCard title={p.placeTitle} description={p.placeDescription} carouselID={`carousel-${i}`} images={p.placeImage} placeName={p.placeName} placeAddress={p.placeAddress} placePhone={p.placePhone} />
	     	</div>
	     )
     )}
     </div>
)

export default List;