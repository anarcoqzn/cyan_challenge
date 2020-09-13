import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavBar extends Component {
    constructor(props){
        super(props)

        this.state={
            collapsed: false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
       this.setState({collapsed:!this.state.collapsed});
    }

    render(){
    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">Create</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>

                    <NavItem>
                        <NavLink href="/components/">Components</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
 }