import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { InfoWindowEx } from './InfoWindowExt';
import history from "../../history";

const mapStyles = {
    width: '100%',
    height: '100%'
};
let markerList = []

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
        markerList = props.eventList;
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    formatTimestamp(UNIX_timestamp) {
        if (!UNIX_timestamp)
            return;

        let a = new Date(UNIX_timestamp * 1000);

        return ('0' + a.getDate()).slice(-2) + '/'
            + ('0' + (a.getMonth() + 1)).slice(-2) + '/'
            + a.getFullYear() + ' '
            + ('0' + a.getHours()).slice(-2) + ':'
            + ('0' + a.getMinutes()).slice(-2);
    }

    render() {
        const {
            google,
        } = this.props;

        return (
            <Map google={google}
                zoom={10}
                onClick={this.onMapClick}
                style={mapStyles}
                initialCenter={this.props.initialPoint}
            >
                {
                    this.props.events.map(event => {
                        return (
                            <Marker
                                key={event.id}
                                onClick={this.onMarkerClick}
                                description={event.description}
                                date={event.date}
                                name={event.name}
                                id={event.id}
                                position={{
                                    lat: event.localization.latitude,
                                    lng: event.localization.longitude
                                }}
                            />
                        );
                    })

                }
                <InfoWindowEx
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    style={{ padding: "10px" }}
                >
                    <div>
                        <dl className="row">
                            <dt className="col-sm-8">Name</dt>
                            <dd className="col-sm-8">{this.state.selectedPlace.name}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-8">Description</dt>
                            <dd className="col-sm-8">
                                <p>{this.state.selectedPlace.description}</p>
                            </dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-8">Date</dt>
                            <dd className="col-sm-8">{this.formatTimestamp(this.state.selectedPlace.date)}</dd>
                        </dl>
                        <button className="btn btn-lg btn-primary btn-block" onClick={() =>
                            this.props.onDetailsClick(this.state.selectedPlace.id)
                        }>Details</button>
                    </div>
                </InfoWindowEx>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAdyBU9OJSLdVFyJ4g4OWaTghDWNM1G5Tg'
})(MapContainer);