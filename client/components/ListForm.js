import React from "react";
import { Form } from 'semantic-ui-react'

const ListForm = props =>
<div className="row">
    <div className="col-lg-6">
        <Form>
            <Form.Field>
                <label>Title</label>
                <input placeholder="Title"
                       name="listTitle"
                       value={props.listTitle}
                       onChange={props.handleInputChangeList} />
            </Form.Field>
            <Form.Field>
                <label>Subtitle</label>
                <input placeholder="Subtitle"
                       name="listSubtitle"
                       value={props.listSubtitle}
                       onChange={props.handleInputChangeList} />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <textarea placeholder="Description"
                          name="listDescription"
                          value={props.listDescription}
                          onChange={props.handleInputChangeList} />
            </Form.Field>
            <Form.Field>
                <label>Image</label>
                <input placeholder="Image"
                       name="listImg"
                       value={props.listImg}
                       onChange={props.handleInputChangeList} />
            </Form.Field>
            <Form.Field>
                <label>Category</label>
                <input placeholder="Category"
                       name="listCategory"
                       value={props.listCategory}
                       onChange={props.handleInputChangeList} />
            </Form.Field>
        </Form>
    </div>
</div>

export default ListForm;
