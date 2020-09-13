import React, { Component } from 'react';
import {BsPlusCircle} from 'react-icons/bs'
import {Button, ListGroup, Tooltip} from 'reactstrap';
import MillModal from '../MillModal';
import SearchByCode from '../SearchByCode';
import SearchByName from '../SearchByName';

import './styles.css'

export default class Sidebar extends Component{
    constructor(props){
    super(props)
        
        this.state={
            mills:[],
            millSelected:"",
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
                    <SearchByName
                        objectName={"Mill"}
                        loadMills={this.props.loadMills}
                    />
                    <SearchByName
                        objectName={"Farm"}
                        loadFarms={this.props.loadFarms}
                    />
                </ListGroup>
                <ListGroup>
                    <SearchByCode
                        objectName={"Harvest"}
                        loadHarvests={this.props.loadHarvests}
                    />
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