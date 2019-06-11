import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Event.css";

class Event extends Component {
    constructor(props) {
        super(props);
    }

    formatTimestamp(UNIX_timestamp){
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

    render() {
        return (<div onClick={() => this.props.onClick(this.props.id)} className="event">
            <h2>{this.props.name}</h2>
            <h3>Owner: {this.props.owner}</h3>
            <h3>Rating: {this.props.rating}</h3>
            <p>{this.props.description}</p>
            <div className="eventFooter">
                <span>{this.formatTimestamp(this.props.date)}</span>
            </div>
        </div>);
    }
}

Event.propTypes = {
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,

    onClick: PropTypes.func.isRequired
};

export default Event;