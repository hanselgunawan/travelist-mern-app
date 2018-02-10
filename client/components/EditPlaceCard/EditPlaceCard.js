import React from 'react'
import { Button, Card, Icon, Image, Label} from 'semantic-ui-react'
import Carousel from '../Carousel/Carousel.js';
import ImgDrop from '../ImgDrop/ImgDrop';
import Geolocation from '../Geolocation';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'

const makeIntoString = (a, v) => a + " "+v;

class EditPlaceCard extends React.Component {
  constructor(props){
    super(props)
    this.state={
      imageURLs: []
    }
  }

  getImgUrls(img){
    this.setState({
      imageURLs: [...this.state.imageURLs, img]
    }, () => {
      this.props.handleInputImageChange(this.props.placeId, this.state.imageURLs)
    })
  }

  render(){
    return (
      <div className="card-size">
   <div className="fluid ui card">
    <div className="content">
      <div className="header"><Icon name="write" size="small"/> Place {this.props.place_index} </div>
    </div>
    <div className="content">
        <div className="ui form">
          <div className="field">
          <label>Title</label>
            <input placeholder="Title" type="text"
                           name="placeTitle"
                           value={this.props.placeTitle}
                           onChange={(e) => this.props.handleInputChangePlace(e, this.props.placeId)}/>
          </div>
          <div className="field">
          <label>Location</label>
            <Geolocation
                        fetchLocationDetails={(suggest) => this.props.fetchLocationDetails(suggest, this.props.placeId)}
                        placeName={this.props.placeName}
                    />
          </div>
          <div className="field">
          <label>Content</label>
              <textarea name="placeDescription"
                              value={this.props.placeDescription}
                              onChange={(e) => this.props.handleInputChangePlace(e, this.props.placeId)} ></textarea>
          </div>
          <ImgDrop maxPics={5} getImgUrls={this.getImgUrls.bind(this)} />
          <textarea className="no-show" placeholder="Image Links" type="text" name="placeImage"
                           value={this.state.imageURLs.length > 0 ? this.state.imageURLs.reduce(makeIntoString) : ""}
                           onChange={(e) => this.props.handleInputChangePlace(e, this.props.placeId)}/>
        </div>
    </div>
  </div>
</div>
    )
  }
}

export default EditPlaceCard;