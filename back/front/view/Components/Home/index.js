import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import FieldMap from '../FieldMap';
import api from '../../../services/api'
import socketIOClient from 'socket.io-client';
import {toast} from 'react-toastify';

import './styles.css'
import NavBar from '../NavBar';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            fieldModal:{
                isOpen:false
            },
            fieldData:{},
            fields: []
        }

        this.toggleFieldModal = this.toggleFieldModal.bind(this);
        this.loadMills = this.loadMills.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.loadHarvests = this.loadHarvests.bind(this);
        this.loadFarms = this.loadFarms.bind(this);
    }

    toggleFieldModal(fieldData){

        this.setState({fieldData});
        this.setState({fieldModal:{
            isOpen:!this.state.fieldModal.isOpen
        }})
    }

    loadMills(params) {
       api.get(`http://localhost:3333/api/mill${params}`)
        .then(res => {
            
            if(res.data.error) {toast.error(res.data.error)}
            else{
                if(params){
                    const harvests = res.data.harvests;
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
            }
        })
    }

    loadHarvests(params){
        
        api.get(`http://localhost:3333/api/harvest${params}`)
        .then(res => {
            if(res.data.error) {toast.error(res.data.error)}
            else{
                const allFields = [];
                if(params){
                    if(params.length == 2){
                        const farms = res.data.farms;
                        farms.map(farm=>
                            farm.fields.map(field=>
                                allFields.push(field))
                            )
                    }else{
                        const harvests = res.data;
                        harvests.map(harvest=>{
                            const farms = harvest.farms
                            farms.map(farm=>
                                farm.fields.map(field =>
                                    allFields.push(field)
                                    )
                                )
                            }
                        )
                    }
                    this.setState({fields:allFields})
                }
            }
        });
    }

    loadFarms(params){
        
        api.get(`http://localhost:3333/api/farm${params}`)
        .then(res =>{
            if(res.data.error) {toast.error(res.data.error)}
            else{
                if(params){
                    this.setState({farm:res.data});
                    const fields = this.state.farm.fields;
                    this.setState({fields})
                }
            }
        });
    }

    loadFields(params){
        
        api.get(`http://localhost:3333/api/field${params}`)
        .then(res =>{

            if(res.data.error) {toast.error(res.data.error)}
            else this.setState({fields:[res.data]})
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
                    <NavBar
                        fieldData={this.state.fieldData}
                        isFieldModalOpen={this.state.fieldModal.isOpen}
                        toggleFieldModal={this.toggleFieldModal}
                        loadFields={this.loadFields}
                    />
                    <Sidebar 
                        loadMills={this.loadMills}
                        loadHarvests={this.loadHarvests}
                        loadFarms={this.loadFarms}
                        loadFields={this.loadFields}
                    />
                </div>
                <div className="map-container">
                    <FieldMap
                        toggleFieldModal={this.toggleFieldModal} 
                        loadFields={this.loadFields}
                        fields={this.state.fields}
                    />
                </div>
            </div>
        )
    }
}