import React, { Component } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Field from '../Field';

export default class Home extends Component{

    render(){
        return (
            <div>
                <div className="sidebar-container">
                    <Sidebar/>
                </div>
                <div className="map-container">
                    <Field/>
                </div>
            </div>
        )
    }
}