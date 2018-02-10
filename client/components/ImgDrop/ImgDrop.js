import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import 'semantic-ui-css/semantic.min.css';
import "./ImgDrop.css";
import './logic.js';
import Carousel from '../Carousel/Carousel'
import { Button, Card, Icon, Image, Label, List} from 'semantic-ui-react'


const CLOUDINARY_UPLOAD_PRESET = 'ospcctun';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/listo-app/image/upload';

var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};

var componentConfig = { postUrl: 'no-url' };
var djsConfig = { autoProcessQueue: true }
var eventHandlers = { addedfile: (file) => console.log(file) }


const NoPictures = () => {
  return (<div class="ui card fluid drag">
            <div class="content">
              <p class="muted center aligned ">Drag and Drop Images Here</p>
            </div>
          </div>);
}

const ImageList = (props) => {
  return (
    <div>
    <div class="ui card fluid drag">
        <div class="content">
          <List divided relaxed>
            {props.imgs.map(v => (
              <List.Item>
              <List.Icon name='file image outline' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header> {v} </List.Header>
              </List.Content>
            </List.Item>
            ))}
          </List>
        </div>
    </div>
    </div>
  )
}


export default class ImgDrop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadedFiles: [],
      uploadedFileCloudinaryUrls: [],
      imgfiles: [],
      imgfilenames: [],
      dropzoneActive: false
    };
  }


  onImageDrop(files) {

    if (this.state.imgfilenames.length < this.props.maxPics){
      this.setState({
      uploadedFiles: [...this.state.uploadedFiles, files[0]],
      imgfiles: [...this.state.imgfiles, files[0].preview],
      imgfilenames: [...this.state.imgfilenames, files[0].name]
    }, () => {
      this.handleImageUpload(files[0])
    });
    }
    
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrls: [...this.state.uploadedFileCloudinaryUrls, response.body.secure_url]
        }, () => {
          this.props.getImgUrls(response.body.secure_url)
        });
      }
    });
  }


  render() {
    return (
      <form>
          <Dropzone
            className={this.state.dropzoneActive ? "drag": null}
            style={{'background-image': `url(${this.state.imgfile})`}}
            onDrop={this.onImageDrop.bind(this)}
            onDragEnter={this.onDragEnter.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
            multiple={false}
            accept="image/*">
            {this.state.imgfilenames.length == 0 ? <NoPictures /> : <ImageList imgs={this.state.imgfilenames}/>}
          </Dropzone>
          <br/>
          { this.state.imgfiles.length != 0 ? <Carousel id="carousel-test1" images={this.state.imgfiles}/> : null}
      </form>
    )
  }
}

