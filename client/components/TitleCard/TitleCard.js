import React from 'react'
import { Button, Card, Icon, Image, Label} from 'semantic-ui-react'
import Carousel from '../Carousel/Carousel.js'
import 'semantic-ui-css/semantic.min.css';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const TitleCard = (props) => (
<div className="card-size title-card">
   <div className="fluid ui card orange">
    <div className="content header">
    <div className="header"><Icon name={props.ListIcon} size="small"/> {props.ListCategory} </div>
  </div>
    <div className="content">
      <div className="details">
      <h1 className="heading title-heading">{props.title}</h1>
      <h2 className="description">{props.subtitle}</h2>
      <Image src='http://pm1.narvii.com/6584/02ad0b86f0010ec9806f6e428fd35bfc7f2efc57_128.jpg' avatar />
      <span> &nbsp; by {props.userName} &nbsp;|&nbsp; Updated on {props.updated}</span>
      <br/><br/>
      <div className="right aligned">
      {props.tags.map(v => (
        <Label tag size="mini" as="a"> {v} </Label>
      ))}
      </div>

      </div>
    </div>
    <Carousel  id={props.carouselID} images={[props.image]}/>
    <div className="content">
    <h3> {props.description} </h3>
    </div>
    <div className="row extra content no-gutters">
      <div className="col-3">
      </div>
      <div className="col-9 text-right">
      <i className="right floated like icon big"></i>
      <i className="right floated star icon big"></i>
      </div>
    </div>

  </div>
</div>
)

export default TitleCard