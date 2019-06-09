import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Event.css";

function Event(props) {
    return (
        <div onClick={()=>navigateToEvent(props.id)} className="event">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <div className="eventFooter">
                <span>{props.date}              
                </span>
            </div>
        </div>
        
    );
}

function navigateToEvent(property){
    window.location = '/api/events/' + property;
}

Event.propTypes = {
    description: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    fullDescription: PropTypes.string.isRequired,
    organizers: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

    handleClick: PropTypes.func.isRequired,
};

export default Event;