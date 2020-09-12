import React, { Component } from "react";
import HarvestModal from "../HarvestModal";
import api from '../../../services/api';
import {toast} from 'react-toastify';
import {Button, Collapse, ListGroup, ListGroupItem} from 'reactstrap';

import './styles.css'
import { BsPlusCircleFill } from "react-icons/bs";
import FarmModal from "../FarmModal";

export default class NavItem extends Component{
    constructor(props){
        super(props)

        this.state={
            harvestModal:{
                isOpen:false
            },
            millSelected: null,
            harvestSelected:null,
            harvests:[],
            isCollapseOpen:false,
            farmModal:{
                isOpen:false
            }
        }

        this.toggleFarmModal = this.toggleFarmModal.bind(this);
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
        this.setState({harvestSelected:id})
        api.get(`http://localhost:3333/api/harvest/${id}`)
        .then(res =>{
            const farms = res.data.farms;
            console.log(farms)
            if(farms.length === 0) return(this.toggleFarmModal())
        })
    }

    toggleHarvestModal(){
        this.setState({
            harvestModal:{
                isOpen:!this.state.harvestModal.isOpen
            }
        })
    }

    toggleFarmModal(){
        this.setState({
            farmModal:{
                isOpen:!this.state.farmModal.isOpen
            }
        })
    }

    toggleCollapse(id){
        if(this.state.isCollapseOpen)  {
            this.setState({isCollapseOpen:false});
        }
        else this.loadHarvests(this.props.millId);
    }

    componentDidMount(){
        
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

                <FarmModal
                    toggle={this.toggleFarmModal}
                    isOpen={this.state.farmModal.isOpen}
                    harvestCode={this.state.harvestSelected}
                />

                <ListGroupItem className="item" onClick={()=>this.toggleCollapse(this.props.millId)}
                    color="info">
                    {this.props.content}
                </ListGroupItem>

                <Collapse isOpen={this.state.isCollapseOpen}>
                    <ListGroup>
                        {this.state.harvests.map(h =>
                        <ListGroupItem
                                onClick={()=>this.loadFarms(h.code)}
                                key={h.code}>Harvest code: {h.code}</ListGroupItem>)}
                    </ListGroup>

                    <Button id="add-button" onClick={this.toggleHarvestModal}>
                        <BsPlusCircleFill size="1em"/>
                    </Button>
                </Collapse>
            </div>
        );
    }
}