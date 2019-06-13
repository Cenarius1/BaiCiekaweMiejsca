import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./NavigationBottomStyles.css";

export const NavigationBottom = () =>
    <nav className="navbar fixed-bottom navbar-light bg-light">
        <Link className="navbar-brand" to="/map">Map</Link>
        <Link className="navbar-brand" to="/list">List</Link>
        <Link className="navbar-brand" to="/add">Add</Link>
    </nav>;