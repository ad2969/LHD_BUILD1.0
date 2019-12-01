import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Event from "./Event";
import EventTop from "./EventTop";
import Marker from './small/marker';
import Header from './template/header';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEvent: false,
      center: {
        lat: 49.2666,
        lng: -123.2480
      },
      zoom: 16
    };
    this.clickEvent = this.clickEvent.bind(this);
  }

  handleApiLoaded(map, maps) {
    console.log(map);
    console.log(maps);
    const newCenter = {
      lat: 0,
      lng: 0
    };
    this.google = map;
    const currentPos = navigator.geolocation.getCurrentPosition(
      pos => {
          const coords = pos.coords;
          this.setState( prevState => ({
            center: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          }), () => { this.google.panTo(this.state.center); });
        }
    );
  }


  clickEvent(latt, lngg) {
    this.setState( prevState => ({
      ...prevState,
      showEvent: !this.state.showEvent,
      center: {
        lat: latt,
        lng: lngg
      }
    }));
    console.log("show Event Clicked!", this.state.showEvent);
    this.google.panTo(this.state.center);
  }

  render() {
    const defaultCenter = {
      lat: 0,
      lng: 0
    };
    const defaultZoom = 16;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '90vh', width: '100%' }} >
        <Header show = {!this.state.showEvent}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD9L-pZrIUda4oTGDJ_RnbstCx0b8haZvA" }}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          <Marker
            lat={49.2666}
            lng={-123.2480}
            text="My Marker"
            clickEvent = { this.clickEvent }
          />
        </GoogleMapReact>
        <EventTop show = {this.state.showEvent} />
        <Event show = {this.state.showEvent} />
      </div>
    );
  }
}

export default Map;
