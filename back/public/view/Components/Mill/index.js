import React, {Component} from 'react';
import api from '../../../services/api';

import './styles.css'

export default class Mill extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            mill: {},
            data:[]
        };
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        api.get(`http://localhost:3333/api/mill/${parseInt(id)}`)
        .then(res => {
            const mill = res.data;
            this.setState({mill});
            this.setState({data:res.data.harvests})  
        });
    }
    
    render(){
        const harvests = this.state.data;
        const mill = this.state.mill;
        return (
            <div className="list">
                <article>
                    <h1>{mill.name}</h1>
                    {harvests.map(h =>
                        <div className="list2" key={h.code}>
                            <p><strong>Harvest Code:</strong> {h.code}</p>
                            <p><strong>Start:</strong> {h.start}</p>
                            <p><strong>End</strong>: {h.end}</p>
                            <h5>Created by:</h5>
                        </div>
                        )}
                </article>
            </div>
        )
    }
}