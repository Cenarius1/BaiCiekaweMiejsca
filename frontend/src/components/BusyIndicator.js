import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import "./BusyIndicatorStyles.css";

export const BusyIndicator = ({ text }) =>
    <div className="overlay">
        <div className="overlay-content">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: "100px", height: "100px" }} />
            <p className="mt-2 mb-2">{text}</p>
        </div>
    </div>;

BusyIndicator.propTypes = {
    text: PropTypes.string
};