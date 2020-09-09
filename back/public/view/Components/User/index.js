import React, {Component} from 'react';
import api from '../../../services/api'
import {Link} from 'react-router-dom';

import "./styles.css";

export default class User extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            mills:[]
        }
    }

    componentDidMount(){
        api.get("http://localhost:3333/api/mill")
        .then(res => {
            const mills = res.data;
            this.setState({mills});
        })
    }

    render(){
        const mills = this.state.mills;
        return (
            <div className = "list">
                {mills.map(mill =>
                <div key={mill.id}>
                    <article><strong>{mill.name}</strong>
                        <p>Created by: {mill.owner.name}</p>
                        <Link to={`/mill/${mill.id}`}>Acessar</Link>
                    </article>
                </div>)}
            </div>
        )
    }
}