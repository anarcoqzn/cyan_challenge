import React, { Component } from 'react';
import api from '../../../services/api'
import NavItem from '../Navitem';
import {BsPlusCircle} from 'react-icons/bs'
import {Button} from 'reactstrap';

import './styles.css'
import MillModal from '../MillModal';

export default class Sidebar extends Component{
    constructor(props){
    super(props)
        
        this.state={
            mills:[],
            millSelected:null,
            harvestSelected:null,
            farmSelected:null,

            millModal:{
                isOpen:false,
                millData:{
                    code:null,
                    name:null
                }
            }
        }

        this.handleAddMillClick = this.handleAddMillClick.bind(this);
        this.toggleMillModal = this.toggleMillModal.bind(this);
        this.loadMills = this.loadMills.bind(this);
        this.loadHarvests = this.loadHarvests.bind(this);
        this.loadFarms = this.loadFarms.bind(this);
    }

    loadMills() {
        api.get("http://localhost:3333/api/mill")
        .then(res => {
            const mills = res.data;
            this.setState({mills});
        })
    }

    loadHarvests(id){
        this.setState({millSelected:id})
        api.get(`http://localhost:3333/api/mill/${parseInt(id)}`)
        .then(res => {
            const harvest = res.data.harvests[0];
            this.setState({harvestSelected:harvest})
            this.loadFarms(harvest.code)
        });
    }
    
    loadFarms(id){
        api.get(`http://localhost:3333/api/harvest/${id}`)
        .then(res =>{
            const farm = res.data.farms[0];
            this.setState({farmSelected:farm});
            this.props.loadFields(farm.code);
        })
    }
        
    componentDidMount(){
        this.loadMills();
    }

    toggleMillModal(){
        this.setState({millModal:{
            isOpen:!this.state.millModal.isOpen
        }})
    }

    handleAddMillClick(){
        this.setState({millModal:{
            isOpen:true
        }})
    }

    render(){
        return (
            <div >

                <MillModal
                    loadMills={this.loadMills}
                    toggle={this.toggleMillModal}
                    millData={this.state.millModal.millData}
                    isOpen={this.state.millModal.isOpen}
                />

                {this.state.mills.map(mill =>
                    <div key={mill.id} onClick={() => this.loadHarvests(mill.id)} >
                        <NavItem content={mill.name}/>
                    </div>)
                }
                <Button id="add-button" onClick={this.handleAddMillClick}>
                    <BsPlusCircle  size="2em"/>
                </Button>
            </div>
        )
    }
}