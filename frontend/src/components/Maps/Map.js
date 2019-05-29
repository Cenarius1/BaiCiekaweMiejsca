import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const Tooltip = ({ title, description, rating }) =>
    <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">Rating: {rating}</p>
            <a href="#" className="btn btn-primary">Show details</a>
        </div>
    </div>;


const defaultProps = {
    center: {
        lat: 59.95,
        lng: 30.33
    },
    zoom: 11
};

const Map = ({ markers }) => (
    <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAdyBU9OJSLdVFyJ4g4OWaTghDWNM1G5Tg" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            {markers.map(marker => <Tooltip
                lat={marker.lat}
                lng={marker.lng}
                title={marker.title}
                description={marker.description}
                rating={marker.rating}
            />)}
        </GoogleMapReact>
    </div>
);

Map.propTypes = {
    markers: PropTypes.array
};


export default Map;
