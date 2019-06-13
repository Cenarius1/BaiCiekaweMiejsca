import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

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
            })
        }
    };

    render() {
        const {
            google,
            eventList
        } = this.props;

        const initialCenter = {
            lat: -1.2884,
            lng: 36.8233
        };
        return (
            <Map google={google} zoom={14} onClick={this.onMapClick} style={mapStyles} initialCenter={initialCenter}>
                {
                    markerList.map(marker => {
                        return (
                            <Marker
                                key={marker.id}
                                onClick={this.onMarkerClick}
                                title={marker.title}
                                name={marker.name}
                                position={{
                                    lat: marker.lat,
                                    lng: marker.lng
                                }}
                            />
                        );
                    })

                }
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <button>
                            Deitals
                        </button>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAdyBU9OJSLdVFyJ4g4OWaTghDWNM1G5Tg'
})(MapContainer);