import React, { Component } from 'react';
import './App.css';
import EditPlaceCard from './EditPlaceCard/EditPlaceCard'
import EditTitleCard from './EditTitleCard/EditTitleCard'

const AddPlaceBtn = () => (
	<div class="add-card">
	    <div class="ui fluid link card add-card">
  			<div class="content">
    			<h1 class="header center aligned">Add Card</h1>
  			</div>
		</div>
	</div>
 )

class EditListView extends Component {
  render() {
    return (
    <div>
    	<EditTitleCard />
    	<EditPlaceCard />
    	<AddPlaceBtn />
    </div>
    );
  }
}

export default EditListView;