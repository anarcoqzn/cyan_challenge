import React, {Component} from 'react';
import axios from 'axios';

export default class Mill extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
    return <div>{this.props.name}</div>
    }
} 