import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import MillModal from '../MillModal';
import HarvestModal from '../HarvestModal';
import FarmModal from '../FarmModal';

import './styles.css'

export default class NavBar extends Component {
    constructor(props){
        super(props)

        this.state={
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

    render(){
    return (
        <div>
            <MillModal
                isOpen={this.state.millModal.isOpen}
                toggle={this.toggleMillModal}
            />

            <HarvestModal
            
            />
            
            <FarmModal
            
            />

            <Navbar color="faded" light>
                <NavbarBrand className="mr-auto">Create</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>

                    <NavItem>
                        <NavLink onClick={this.toggleMillModal}>Create Mill</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink>Create Harvest</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink>Create Farm</NavLink>
                    </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
 }