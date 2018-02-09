import React from "react";
import Geolocation from './Geolocation';
import { Form } from 'semantic-ui-react';

const PlaceForm = props =>
    <div className="row">
        <div className="col-lg-6">
            <Form>
                <Form.Field>
                    <label>Place Title</label>
                    <input placeholder="Title"
                           name="placeTitle"
                           value={props.placeTitle}
                           onChange={(e) => props.handleInputChangePlace(e, props.placeId)} />
                </Form.Field>
                <Form.Field>
                    <label>Place Description</label>
                    <textarea placeholder="Description"
                              name="placeDescription"
                              value={props.placeDescription}
                              onChange={(e) => props.handleInputChangePlace(e, props.placeId)} />
                </Form.Field>
                <Form.Field>
                    <label>Location</label>
                    <Geolocation
                        fetchLocationDetails={(suggest) => props.fetchLocationDetails(suggest, props.placeId)}
                        placeName={props.placeName}
                    />
                </Form.Field>
                <button onClick={props.deletePlace.bind(null, props.placeId)}>Delete</button>
            </Form>
        </div>
    </div>

export default PlaceForm;
