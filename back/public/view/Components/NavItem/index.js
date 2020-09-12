import React, { Component } from "react";

import './styles.css'

export default class NavItem extends Component{
    constructor(props){
        super(props)
     
    }

    render(){
        return (
            <div className="item">
                <a>{this.props.content}</a>
            </div>
        );
    }
}