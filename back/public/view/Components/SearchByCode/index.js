import React, {Component} from 'react';
import { BiSearch } from 'react-icons/bi';
import { Button, Input, Label, ListGroupItem } from 'reactstrap';

import './styles.css'

export default class SearchByCode extends Component{
    constructor(props){
        super(props)

        this.state = {
            input:0,
            harvest:{},
            farm:{},
            field:{}
        }

        this.searchOnClick = this.searchOnClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    
    onInputChange(event){
        this.setState({input:event.target.value});
    }

    searchOnClick(){
        const objectName = this.props.objectName
        if(objectName === "Harvest"){
            const params = "/"+this.state.input;
            this.props.loadHarvests(params);

        }else if(objectName === "Farm"){
            
        }else if(objectName === "Field"){
            
        }
    }

    render(){
        return(
           <ListGroupItem>
               <Label>{"Search "+this.props.objectName+" by code"}</Label>
                <Input
                    type="number"
                    value={this.state.input}
                    valid={this.state.input>0}
                    onChange={this.onInputChange}
                    />
                
                <Button 
                    disabled={this.state.input <=0}
                    onClick={this.searchOnClick} 
                    color="primary">
                    <BiSearch/>
                </Button>
            </ListGroupItem>
        )
    }
}