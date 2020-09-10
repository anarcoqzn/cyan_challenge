import React, { Component } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

export default class Home extends Component{

    render(){
            return <div>
                <div>
                    <div className="sidebar-container">
                        <Sidebar/>
                    </div>
                    
                </div>
                
            </div>
    }
}