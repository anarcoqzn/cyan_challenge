import React, {Component} from "react";
import api from '../../../services/api';
import {toast} from 'react-toastify';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
//import {GoogleMapReact from 'google-map-react';

import './styles.css'
import FieldMarker from "./FieldMarker";

export default class Field extends Component{
    constructor(props){
        super(props);
        this.state={
            lat: 0,
            lng: 0,
            zoom: 13
        }
    }

    loadField(){
        const {id} = this.props.match.params;
        api.get(`http://localhost:3333/api/field/${id}`)
        .then(res =>{
            const lat = res.data.coordinates.coordinates[0];
            const lng = res.data.coordinates.coordinates[1];

            this.setState({lat});
            this.setState({lng});
        })
    }

    componentDidMount(){

        this.loadField();

      /*  var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { 
          attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18, 
          id: 'mapbox/streets-v11', 
          accessToken: 'pk.eyJ1IjoiYW5hcmNvcXIiLCJhIjoiY2tleDVqcjBhMDI3aTJyczJ4dmVqcndvbyJ9.3zSGOeZScmR465tGhDUxhA' }).addTo(mymap);

          const marker = L.marker([37.7544, -122.4477]).addTo(mymap);*/
    }
    
    render(){
        const position = [this.state.lat, this.state.lng]

        var myIcon = L.icon({
            iconUrl: 'https://previews.123rf.com/images/marylia17/marylia171503/marylia17150300044/38017617-vector-sun-rising-under-the-field-icon-eco-symbol-logo.jpg',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });

        return (
            <div>
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker  icon ={myIcon} position={position}>
                        
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

//AIzaSyAymZXNfOPH9sQeAeesd-dxy119Ajg7M3Q