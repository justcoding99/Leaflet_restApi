import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './styles.css';
import { login, ACCESS_TOKEN } from "./APIUtils";


export class Leaflet extends Component {
  state = {
    center: [41.015137, 28.979530],
    zoom: 6,
  };



  showToken(){
    console.log(ACCESS_TOKEN)
  }
  
  render() {
    
    return (
    
      <div>
      
        <Map center={this.state.center} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.state.center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      
        </div>
    );

  }
  
}

