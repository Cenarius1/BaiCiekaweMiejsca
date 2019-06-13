import React, { Component } from 'react'
import PropTypes from 'prop-types';

const PostForm = ({ name, description, longitude, latitude, type, isBusy, formUpdate, handleSubmit }) => {
    return (        
        <form>
        <div className="form-group">
            <label  htmlFor="exampleInputEmail1" className="sr-only">Name</label>
            <input required type="text" placeholder="Enter Event Name" value={name} disabled={isBusy} name="name"
            onChange={(changeEvent) => formUpdate("name", changeEvent)} className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="sr-only">Description</label>
            <textarea required rows="5" cols="28" placeholder="Enter description" value={description} disabled={isBusy} name="description"
            onChange={(changeEvent) => formUpdate("description", changeEvent)} className="form-control"/>
        </div>
        <div className="form-group">
            <input required type="text" placeholder="Enter Longitude" value={longitude} disabled={isBusy} name="longitude"
            onChange={(changeEvent) => formUpdate("longitude", changeEvent)} className="form-control"/>
        </div>            
        <div className="form-group">
            <input required type="text" placeholder="Enter Latitude" value={latitude} disabled={isBusy} name="latitude"
            onChange={(changeEvent) => formUpdate("latitude", changeEvent)} className="form-control"/>
        </div>
        <div className="form-group">
            <input required type="text" placeholder="Enter Type" value={type} disabled={isBusy} name="type"
            onChange={(changeEvent) => formUpdate("type", changeEvent)} className="form-control"/>
        </div>
            <button className="btn btn-lg btn-primary btn-block" onClick={event => handleSubmit(event)} disabled={isBusy}>
                {isBusy && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                {isBusy && " Saving..."}
                {!isBusy && "Add Event"}
            </button>
        </form>
       
    )    
}

PostForm.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formUpdate: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired
}

export default PostForm;