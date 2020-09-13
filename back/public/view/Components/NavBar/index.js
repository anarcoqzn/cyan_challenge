import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import MillModal from '../MillModal';
import HarvestModal from '../HarvestModal';
import FarmModal from '../FarmModal';

import './styles.css'
import api from '../../../services/api';

export default class NavBar extends Component {
    constructor(props){
        super(props)

        this.state={
            mills:[],
            harvests:[],

            collapsed: false,
            millModal:{
                isOpen:false
            },
            harvestModal:{
                isOpen:false
            },
            farmModal:{
                isOpen:false
            }
        }

        this.getHarvests = this.getHarvests.bind(this);
        this.getMills = this.getMills.bind(this);
        this.toggleMillModal = this.toggleMillModal.bind(this);
        this.toggleHarverstModal = this.toggleHarverstModal.bind(this);
        this.toggleFarmModal = this.toggleFarmModal.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
       this.setState({collapsed:!this.state.collapsed});
    }

    toggleMillModal(){
        this.setState({millModal:{
            isOpen:!this.state.millModal.isOpen
        }})
    }

    toggleHarverstModal(){
        this.setState({harvestModal:{
            isOpen:!this.state.harvestModal.isOpen
        }})
    }

    toggleFarmModal(){ 
        this.setState({farmModal:{
            isOpen:!this.state.farmModal.isOpen
        }})
    }

    getMills(){
        api.get("http://localhost:3333/api/mill")
        .then(res =>{
           this.setState({mills:res.data});
        })
    }

    getHarvests(){
        api.get("http://localhost:3333/api/harvest")
        .then(res=>{
            this.setState({harvests:res.data})
        })
    }

    render(){
    return (
        <div>
            <MillModal
                isOpen={this.state.millModal.isOpen}
                toggle={this.toggleMillModal}
            />

            <HarvestModal
                getMills={this.getMills}
                mills={this.state.mills}
                isOpen={this.state.harvestModal.isOpen}
                toggle={this.toggleHarverstModal}
            />
            
            <FarmModal
                getMills={this.getMills}
                getHarvests={this.getHarvests}
                mills={this.state.mills}
                harvests={this.state.harvests}
                isOpen={this.state.farmModal.isOpen}
                toggle={this.toggleFarmModal}
            />

            <Navbar color="faded" light>
                <NavbarBrand className="mr-auto">Create</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>

                    <NavItem>
                        <NavLink onClick={this.toggleMillModal}>Mill</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink onClick={this.toggleHarverstModal}>Harvest</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink onClick={this.toggleFarmModal}>Farm</NavLink>
                    </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
 }