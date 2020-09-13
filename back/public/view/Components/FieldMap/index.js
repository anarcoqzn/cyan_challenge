import React, {Component} from "react";
import {toast} from 'react-toastify';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import FieldModal from '../FieldModal'

import './styles.css'

export default class FieldMap extends Component{
    constructor(props){
        super(props)
        
        this.state={
            zoom:5,
            fieldModal: {
                isOpen: false,
                fieldData: {
                    code: null,
                    coordinates: [],
                    farmCode: null
                }
            }
        }
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    
    handleMapClick(e){
        const {lat, lng} = e.latlng;
        
        const fieldData={
            coordinates:[lat,lng],
            code:null,
        }
        this.props.toggleFieldModal(fieldData);
    }
    

    render(){

        var myIcon = L.icon({
            iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/2950/2950532.svg',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        
        const center = this.props.fields[0] ? this.props.fields[0].coordinates.coordinates : [0,0];

        return (
            <div>
                
                <Map
                    boundsOptions={{padding: [50, 50]}} 
                    center={center} zoom={this.state.zoom} 
                    onClick={this.handleMapClick}
                    maxBoundsViscosity={1.0}
                    >

                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {this.props.fields.map(field =>
                        <Marker key={field.code} icon ={myIcon} position={field.coordinates.coordinates}>
                            <Popup>
                                <span>Field Code: {field.code}</span>
                                <br/>
                                <span>Latitude: {field.coordinates.coordinates[0]}</span><br/>
                                <span>Longitude: {field.coordinates.coordinates[1]}</span><br/>
                            </Popup>
                        </Marker>
                        )
                    }
                </Map>
            </div>
        )
    }
}