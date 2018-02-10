import React from 'react'
import { Button, Card, Icon, Image, Label} from 'semantic-ui-react'
import Carousel from '../Carousel/Carousel.js'
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'

const PlaceCard = (props) => (
<div className="card-size" >
   <div className="fluid ui card orange">
    <div className="content">
      <h1 className="heading placetitle">{props.title}</h1>
    </div>
    <Carousel id={props.carouselID} images={props.images}/>
    <div className="content">
    <h3> {props.description} </h3>
    </div>
    <div className="row content no-gutters">
      <div className='pin-icon center-parent'>
        <Icon className="center-child" name="point" size="big"/>
      </div>
      <div className="col-9 placeInfo">
        <p>{props.placeName}</p>
        <p>{props.placeAddress}</p>
        <p>{props.placePhone}</p>
      </div>
    </div>
  </div>
</div>
)

export default PlaceCard;