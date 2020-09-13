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

        this.loadMills = this.loadMills.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.loadHarvests = this.loadHarvests.bind(this);
        this.loadFarms = this.loadFarms.bind(this);
    }

    loadMills(params) {
        api.get(`http://localhost:3333/api/mill${params}`)
        .then(res => {
            
            if(res.data.error) {toast.error(res.data.error)}
            else{
                this.setState({mill:res.data});
                const harvests = this.state.mill.harvests;
                const allFields = [];
                harvests.map(harvest =>
                    harvest.farms.map(farm=>
                        farm.fields.map(field=>
                            allFields.push(field)
                        )
                    )
                )
                this.setState({fields:allFields})
            }
        })
    }

    loadHarvests(params){
        
        api.get(`http://localhost:3333/api/mill${parseInt(id)}`)
        .then(res => {
            const harvests = res.data.harvests;
            
            if(harvests.length === 0) return(
                this.toggleHarvestModal()
            )
            this.setState({harvests});
            this.setState({isHarvestCollapseOpen:true})
        });
    }

    loadFarms(params){
        
        api.get(`http://localhost:3333/api/farm${params}`)
        .then(res =>{
            if(res.data.error) {toast.error(res.data.error)}
            else{
                this.setState({farm:res.data});
                const fields = this.state.farm.fields;
                console.log(this.state.farm)
                this.setState({fields})
            }
        })
    }

    loadFields(params){
        
        api.get(`http://localhost:3333/api/farm/${params}`)
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
                    <Sidebar 
                        loadMills={this.loadMills}
                        loadHarvests={this.loadHarvests}
                        loadFarms={this.loadFarms}
                        loadFields={this.loadFields}
                    />
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