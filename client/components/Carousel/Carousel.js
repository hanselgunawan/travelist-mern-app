import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const Carousel = (props) => (
<div id={props.id} className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    {props.images.map((img, index) => (
    <div className= {index == 0 ? "carousel-item active" : "carousel-item"}>
      <img className="d-block w-100 carousel-image" src={img}/>
    </div>
    ))}
  </div>

  <a className={props.images.length > 1 ? "carousel-control-prev" : "carousel-control-prev hidden"} href={"#"+props.id} role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className={props.images.length > 1 ? "carousel-control-next" : "carousel-control-next hidden"} href={"#"+props.id} role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
)

export default Carousel