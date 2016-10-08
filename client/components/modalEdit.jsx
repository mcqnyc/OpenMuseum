import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import store from '../store';
import * as actions from '../actions/actionCreators';
import { submitArt } from '../actions/actionCreators';

import { Bootstrap } from 'react-bootstrap';
import { Button, Modal, showModal, FormGroup, FormControl, ControlLabel, FieldGroup, Input } from 'react-bootstrap';
import myDropzone from './dropzone';

/*
class renderDropzoneInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.getGpsInfo = this.getGpsInfo.bind(this);
  }

  getGpsInfo(event){
  
    var getGpsFromImage = function () {
      return new Promise(function(resolve, reject) {
        EXIF.getData(event.target, function(){
          var geoLocFromImage = {};
          var lat = EXIF.getTag(this, "GPSLatitude");
          var lon = EXIF.getTag(this, "GPSLongitude");
          if (lat) {
            var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";  
            var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W"; 

            geoLocFromImage.lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
            geoLocFromImage.lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
            resolve(geoLocFromImage);
          } else {
            reject("no GPS data. Please type in the address.")
          }
        });    
      });
    }
    
    getGpsFromImage()
    .then((data) => {
      console.log(data);
      this.props.updateLocFromImage(data);
    })
    .catch((data) => {
      console.log(data);
      store.dispatch({type: 'GEO_FROM_IMAGE', payload: data});
    });
  }

  render(){
    // const { value, onChange } = this.props
    const field = this.props
    const files = field.input.value;  
    
  return (
    <div>
      <Dropzone className="dropZone"             
        onDrop={( filesToUpload, e ) => {
          this.setState({images: [...this.state.images,filesToUpload]}, function(){            
            field.input.onChange(this.state.images); //done in callback bc setState doesn't immediately mutate state
          });  
        }
      }
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {this.state.images.length > 0 ? <div>
          <h2>Uploading {this.state.images.length} files...</h2>
          <div id="imageContainer">{this.state.images.map((file) => <img onLoad={this.getGpsInfo} key={file[0].name} className="imagePreview" src={file[0].preview} /> )}</div>
       </div> : null}
    </div>
  );

  }
}
*/

// CODE TO EDIT THE MODAL //

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldArt: '',
      showModal: false,
      newName: '',
      newDescription: '',
      images: []
    };
  }

  render() {
    const { fields: { name, description, images }, handleSubmit } = this.props;
    console.log('===> name', name);
    console.log('==> description', description);
    console.log('=> images', images);
    // const { fields: { name, description, images }, handleSubmit } = this.props;

    // const i = this.props.props.posts.findIndex((post) => post._id === this.props.props.params.id);
    // console.log("post index", i);

    // VARS that came over from John Z's original file:
    // const field = this.props
    // const files = field.input.value;

    return (

      // <div>Create Form</div>
       // <form id = "dropForm" className="dropzone" onSubmit = {handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
      <form onSubmit={handleSubmit}>
        <h3>Edit Art Listing</h3>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" className="form-control" placeholder="text from previous submittal" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Field name="description" component="textarea" type="text" className="form-control" placeholder="text from previous submittal" />
        </div>

        <div>
          <label htmlFor="images">Files</label>
          <Field name="files" component="textarea" placeholder="this is where dropzone goes"/>
        </div>

        <button type="submit" className="btn btn-primary" id="buttonNew">Submit</button>            
        <button type="close" className="btn btn-primary" id="buttonNew">Close</button>            
      </form>

    );
  }
};

function mapStateToProps(state){
  return { 
    loc: state.loc,
    geoFromImage: state.geoFromImage
   }
}

// export default reduxForm({
//   form: 'modalEdit',
//   fields: ['name', 'description', 'images': []]
// }, null, { submitArt })(ModalEdit);

export default reduxForm({
  form: 'modalEdit',
  fields: ['name', 'description', 'images']
})(ModalEdit);
