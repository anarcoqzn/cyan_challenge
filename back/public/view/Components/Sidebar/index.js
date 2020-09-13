import React, { Component } from 'react';
import api from '../../../services/api'
import NavItem from '../Navitem';
import {BsPlusCircle} from 'react-icons/bs'
import {Button, ListGroup, Tooltip} from 'reactstrap';

import './styles.css'
import MillModal from '../MillModal';
import { toast } from 'react-toastify';

export default class Sidebar extends Component{
    constructor(props){
    super(props)
        
        this.state={
            mills:[],
            millSelected:null,
            harvestSelected:null,
            farmSelected:null,
            tooltipOpen:false,
            toolTipRef: React.createRef(),
            millModal:{
                isOpen:false,
            }
        }

        this.tooltipToggle = this.tooltipToggle.bind(this);
        this.handleAddMillClick = this.handleAddMillClick.bind(this);
        this.toggleMillModal = this.toggleMillModal.bind(this);
        this.loadMills = this.loadMills.bind(this);
    }

    loadMills() {
        api.get("http://localhost:3333/api/mill")
        .then(res => {
            const mills = res.data;
            this.setState({mills});
        })
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
    
    tooltipToggle(){
        this.setState({tolltipOpen:!this.state.tooltipOpen})
    }

    componentDidMount(){
        this.loadMills();
        this.tooltipToggle();
    }
    
    render(){
        return (
            <div >
                <MillModal
                    toggle={this.toggleMillModal}
                    isOpen={this.state.millModal.isOpen}
                />

                <ListGroup>
                    {this.state.mills.map(mill =>
                        <NavItem 
                            key={mill.id} 
                            millId={mill.id} 
                            content={mill.name}/>
                    )}
                </ListGroup>

                <span ref={this.state.toolTipRef}>
                    <Button id="add-button" onClick={this.handleAddMillClick}>
                        <BsPlusCircle size="2em"/>
                    </Button>
                <Tooltip placement="bottom" 
                         isOpen={this.state.tooltipOpen} 
                         target={this.state.toolTipRef}
                         toggle={this.tooltipToggle}
                    >
                    Create new mill
                </Tooltip>
                </span>
            </div>
        )
    }
}