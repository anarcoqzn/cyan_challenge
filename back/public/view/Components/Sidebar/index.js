import React, { Component } from 'react';
import {ListGroup} from 'reactstrap';
import SearchByCode from '../SearchByCode';
import SearchByName from '../SearchByName';

import './styles.css'

export default class Sidebar extends Component{
    
    render(){
        return (
            <div >
               
               <ListGroup id="Mill">
                    <SearchByName
                        objectName={"Mill"}
                        loadMills={this.props.loadMills}
                    />
                </ListGroup>

                <ListGroup id="Harvest">
                    <SearchByCode
                        objectName={"Harvest"}
                        loadHarvests={this.props.loadHarvests}
                    />
                </ListGroup>

                <ListGroup id="Farm">   
                    <SearchByName
                        objectName={"Farm"}
                        loadFarms={this.props.loadFarms}
                    /> 
                    <SearchByCode
                        objectName={"Farm"}
                        loadFarms={this.props.loadFarms}
                    />
                </ListGroup>

                <ListGroup id="Field">
                    <SearchByCode
                        objectName={"Field"}
                        loadFields={this.props.loadFields}
                    />
                </ListGroup>
            </div>
        )
    }
}