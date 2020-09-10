import React, {Component} from 'react';
import api from '../../../services/api'

export default class Harvest extends Component{
    constructor(props){
        super(props);

        this.state = {
            harvest:{}
        }

        this.loadHarvest = this.loadHarvest.bind(this);
    }

    loadHarvest(){
        const {id} = this.props.match.params;
        api.get(`http://localhost:3333/api/harvest/${id}`)
        .then(res =>{
                const harvest = res.data;
            }
        )
    }

    componentDidMount(){
        this.loadHarvest();
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}