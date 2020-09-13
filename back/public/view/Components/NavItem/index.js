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
            millSelected: this.props.millId,
            harvestSelected:null,
            harvests:[],
            farms:[],
            isHarvestCollapseOpen:false,
            isFarmCollapseOpen:false,
            farmModal:{
                isOpen:false
            }
        }

        this.toggleFarmModal = this.toggleFarmModal.bind(this);
        this.loadHarvests = this.loadHarvests.bind(this);
        this.toggleHarvestModal = this.toggleHarvestModal.bind(this);
        this.loadFarms = this.loadFarms.bind(this);
        this.toggleHarvestCollapse = this.toggleHarvestCollapse.bind(this);
        this.toggleFarmCollapse = this.toggleFarmCollapse.bind(this);
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
            this.setState({isHarvestCollapseOpen:true})
        });
    }

    loadFarms(id){
        this.setState({harvestSelected:id})
        api.get(`http://localhost:3333/api/harvest/${id}`)
        .then(res =>{
            const farms = res.data.farms;
            if(farms.length === 0) return(this.toggleFarmModal())
            
            this.setState({farms})
            this.setState({isFarmCollapseOpen:true})
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

    toggleHarvestCollapse(){
        if(this.state.isHarvestCollapseOpen)  {
            this.setState({isHarvestCollapseOpen:false});
            this.setState({isFarmCollapseOpen:false})
            this.setState({millSelected:null});
            this.setState({harvestSelected:null});
        }
        else {
            this.loadHarvests(this.props.millId)
        };
    }

    toggleFarmCollapse(hCode){
        if(this.state.isFarmCollapseOpen)  {
            this.setState({isFarmCollapseOpen:false});
        }
        else this.loadFarms(hCode);
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
                    loadFarms={this.loadFarms}
                />

                <ListGroupItem className="item" onClick={this.toggleHarvestCollapse}
                    color="info">
                    {this.props.content}
                </ListGroupItem>

                <Collapse isOpen={this.state.isHarvestCollapseOpen}>
                    <ListGroup>
                        {this.state.harvests.map(h =>
                            
                            <ListGroupItem
                                onClick={()=>this.toggleFarmCollapse(h.code)}
                                key={h.code}>Harvest code: {h.code}
                                
                                <Collapse isOpen={this.state.isFarmCollapseOpen && 
                                          h.code === this.state.harvestSelected}>
                                    <ListGroup>
                                        {this.state.farms.map(f=>
                                            <ListGroupItem 
                                                key={f.code}
                                                onClick={() => this.props.loadFields({id:f.code, name:f.name})}
                                                >
                                                Farm: {f.name}
                                            </ListGroupItem>
                                        )}
                                    </ListGroup>
                                    <Button id="add-button" onClick={this.toggleFarmModal}>
                                        <BsPlusCircleFill size="0.8em"/>
                                    </Button>
                                </Collapse>
                            </ListGroupItem>)}
                    </ListGroup>

                    <Button id="add-button" onClick={this.toggleHarvestModal}>
                        <BsPlusCircleFill size="1em"/>
                    </Button>
                </Collapse>
            </div>
        );
    }
}