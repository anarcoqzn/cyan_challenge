import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import FieldMap from '../FieldMap';
import api from '../../../services/api'
import socketIOClient from 'socket.io-client';
import {toast} from 'react-toastify';

import './styles.css'

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
           farmSelected:{
               name:null,
               id:null
           },  
           fields: []
        }
        this.loadFields = this.loadFields.bind(this);
    }

    loadFields(farmSelected){
        this.setState({farmSelected})
        api.get(`http://localhost:3333/api/farm/${farmSelected.id}`)
        .then(res =>{
                this.setState({fields:res.data.fields})
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
                        farmSelected={this.state.farmSelected}
                        loadFields={this.loadFields}
                        fields={this.state.fields}
                    />
                </div>
            </div>
        )
    }
}