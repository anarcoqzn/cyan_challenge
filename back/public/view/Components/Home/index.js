import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import FieldMap from '../FieldMap';
import api from '../../../services/api'
import socketIOClient from 'socket.io-client';
import {toast} from 'react-toastify';

import './styles.css'
import { useLeaflet } from 'react-leaflet';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
           fields:[],
           farmSelected:null,
           
        }
        this.loadFields = this.loadFields.bind(this)
    }
    
    loadFields(id){
        this.setState({farmSelected:id})
        api.get(`http://localhost:3333/api/farm/${id}`)
        .then(res =>{
                this.setState({fields:res.data.fields})
                console.log(this.state.fields)
            }
        )
    }

    componentDidMount(){
        const socket = socketIOClient(`http://localhost:3333/`);
        socket.on("entity-created", data => {
            toast.info(data.message)
        });
    }

    render(){
        return (
            <div className="app-container">
                <div className="sidebar-container">
                    <Sidebar loadFields={this.loadFields}/>
                </div>
                <div className="map-container">
                    <FieldMap 
                        loadFields={this.loadFields} 
                        farmSelected={this.state.farmSelected} 
                        fields={this.state.fields}
                    
                    />
                </div>
            </div>
        )
    }
}