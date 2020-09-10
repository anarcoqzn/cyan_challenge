import React, {Component} from "react";
import api from '../../../services/api';
import {toast} from 'react-toastify';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class Field extends Component{
    constructor(props){
        super(props);
        this.state={
            lat: 0,
            lng: 0,
            zoom: 13
        }
        
        this.loadFields = this.loadFields.bind(this)
    }

    
    loadFields(){
        const {id} = this.props.match.params;
        api.get(`http://localhost:3333/api/farm/${id}`)
        .then(res =>{
                const farm = res.data;
                this.setState({farm})
                this.setState({fields:res.data.fields})
            }
        )
    }
    
    componentDidMount(){

       
    }
    
    render(){
        const position = [this.state.lat, this.state.lng]

        var myIcon = L.icon({
            iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/2950/2950532.svg',
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