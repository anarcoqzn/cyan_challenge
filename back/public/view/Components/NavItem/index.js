import React, { Component } from "react";
import HarvestModal from "../HarvestModal";
import api from '../../../services/api';
import {toast} from 'react-toastify';
import {Button, Collapse, ListGroup, ListGroupItem} from 'reactstrap';

import './styles.css'
import { BsPlusCircleFill } from "react-icons/bs";

export default class NavItem extends Component{
    constructor(props){
        super(props)

        this.state={
            harvestModal:{
                isOpen:false
            },
            millSelected: null,
            harvests:[],
            isCollapseOpen:false
        }

        this.loadHarvests = this.loadHarvests.bind(this);
        this.toggleHarvestModal = this.toggleHarvestModal.bind(this);
        this.loadFarms = this.loadFarms.bind(this)
    }

    loadHarvests(id){
        this.setState({millSelected:id})
        api.get(`http://localhost:3333/api/mill/${parseInt(id)}`)
        .then(res => {
            const harvests = res.data.harvests;
            
            if(harvests.length === 0) return(
                this.toggleHarvestModal()
            )
            this.setState({harvests});
            this.setState({isCollapseOpen:true})
        });
    }

    loadFarms(id){
        api.get(`http://localhost:3333/api/harvest/${id}`)
        .then(res =>{
            const farm = res.data.farms[0];

            if(!farm) return(toast.warn("Farm not found"))

            this.setState({farmSelected:farm});
            this.props.loadFields(farm.code);
        })
    }

    toggleHarvestModal(){
        this.setState({
            harvestModal:{
                isOpen:!this.state.harvestModal.isOpen
            }
        })
    }

    toggleCollapse(){
        if(this.state.isCollapseOpen) this.setState({isCollapseOpen:false});
        else this.loadHarvests(this.props.millId);
    }

    componentDidMount(){
        console.log(this.state.isCollapseOpen)
    }
    
    render(){
        return (
            <div>
                <HarvestModal
                   toggle={this.toggleHarvestModal}
                   isOpen={this.state.harvestModal.isOpen}
                   millId={this.props.millId}
                   millName={this.props.content}
                />

                <Button className="item" onClick={()=>this.toggleCollapse()}
                    color="info">
                    {this.props.content}
                </Button>

                <Collapse isOpen={this.state.isCollapseOpen}>
                    <ListGroup>
                        {this.state.harvests.map(h =>
                        <ListGroupItem key={h.code}>Harvest code: {h.code}</ListGroupItem>
                        )}
                    </ListGroup>

                    <Button id="add-button" onClick={this.toggleHarvestModal}>
                        <BsPlusCircleFill size="1em"/>
                    </Button>
                </Collapse>
            </div>
        );
    }
}