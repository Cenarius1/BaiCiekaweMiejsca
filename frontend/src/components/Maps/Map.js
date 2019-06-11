import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};
const markerList = [
    {
        id: 1,
        title: 't1',
        name: 'n1',
        lat: -1.2884,
        lng: 36.8233
    },
    {
        id: 2,
        title: 't2',
        name: 'n2',
        lat: -1.2884,
        lng: 37.0
    }
]
export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    doAlert = () => {
        alert(1);
    };

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
            google
        } = this.props;

        const initialCenter = {
            lat: -1.2884,
            lng: 36.8233
        };

        return (
            <Map google={google} zoom={14} onClick={this.onMapClick} style={mapStyles} initialCenter={initialCenter}>
                {markerList.map(marker => {
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
                })}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <button onClick={()=>{alert(1)}}>
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