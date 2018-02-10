import React from 'react'
import { Header, Button, Card, Icon, Image, Label, Dropdown} from 'semantic-ui-react'
import Carousel from '../Carousel/Carousel.js';
import ImgDrop from '../ImgDrop/ImgDrop';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'

const makeIntoString = (a, v) => a + " "+v;

class EditTitleCard extends React.Component {
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
      this.props.handleInputImageChange(this.state.imageURLs[0])
    })
  }

  render(){
    return (
      <div class="card-size title-card-form">
       <div class="fluid ui card">
        <div class="content">
          <div class="header"><Icon name="write" size="small"/> Title </div>
        </div>
        <div class="content">
            <div class="ui form">
              <div class="field">
              <label>Title</label>
                <input placeholder="Title" type="text" name="title"
                           value={this.props.title}
                           onChange={this.props.handleInputChangeList}/>
              </div>
              <div class="field">
              <label>Subtitle</label>
                <input placeholder="Small Description of the List" type="text" name="subtitle"
                           value={this.props.subtitle}
                           onChange={this.props.handleInputChangeList}/>
              </div>
              <div class="field">
              <label>Category</label>
                <input placeholder="Category" type="text" name="category"
                           value={this.props.category}
                           onChange={this.props.handleInputChangeList}/>
              </div>
              <div class="field">
              <label>Content</label>
                  <textarea name="description"
                              value={this.props.description}
                              onChange={this.props.handleInputChangeList}></textarea>
              </div>
              <ImgDrop maxPics={1} getImgUrls={this.getImgUrls.bind(this)} />
            </div>
        </div>
      </div>
    </div>
    )
  }

}

export default EditTitleCard;