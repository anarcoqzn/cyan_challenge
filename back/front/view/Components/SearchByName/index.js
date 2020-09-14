import React, {Component} from 'react';
import { BiSearch } from 'react-icons/bi';
import { Button, Input, ListGroupItem } from 'reactstrap';

import './styles.css'

export default class SearchByName extends Component{
    constructor(props){
        super(props)

        this.state = {
            input:"",
            mill:{},
            farm:{},
        }

        this.searchOnClick = this.searchOnClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    
    onInputChange(event){
        const input = event.target.value.trim();
        this.setState({input});
    }

    searchOnClick(){
        const objectName = this.props.objectName
        if(objectName === "Mill"){
            
            const params = "?name="+this.state.input;
            this.props.loadMills(params);
            
        }else if(objectName === "Farm"){
            const params = "?name="+this.state.input;
            this.props.loadFarms(params)
        }
    }

    isEmpty(str){
        return (!str && str.length===0 && /^\s*$/.test(str) );
    }

    componentDidMount(){
        if (!String.prototype.trim) {
            String.prototype.trim = function () {
              return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
        }
    }

    render(){
        return(
           <ListGroupItem>
                <Input
                    placeholder={"Search "+this.props.objectName+" by name"} 
                    type="text"
                    value={this.state.input}
                    valid={!this.isEmpty(this.state.input)}
                    onChange={this.onInputChange}
                    />
                
                <Button 
                    disabled={this.isEmpty(this.state.input)}
                    onClick={this.searchOnClick} 
                    color="primary">
                    <BiSearch/>
                </Button>
            </ListGroupItem>
        )
    }
}