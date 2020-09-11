import React, { Component } from 'react';
import api from '../../../services/api'
import FieldMap from '../FieldMap';


export default class Sidebar extends Component{
    constructor(props){
        super(props);

        this.state={
            mills:[],
            harvests:[],
            farms:[],
            millSelected:null,
            harvestSelected:null,
        }

        this.loadMills = this.loadMills.bind(this);
        this.loadHarvests = this.loadHarvests.bind(this);
        this.loadFarms = this.loadFarms.bind(this);
    }

    loadMills() {
        api.get("http://localhost:3333/api/mill")
        .then(res => {
            const mills = res.data;
            this.setState({mills});
        })
    }

    loadHarvests(id){
        this.setState({millSelected:id})
        api.get(`http://localhost:3333/api/mill/${parseInt(id)}`)
        .then(res => {
            const {harvests} = res.data;
            this.setState({harvests}); 
        });
    }
    
    loadFarms(id){
        this.setState({harvestSelected:id})
        api.get(`http://localhost:3333/api/harvest/${id}`)
        .then(res =>{
                const {farms} = res.data;
                this.setState({farms})
            }
        )
    }

    componentDidMount(){
        this.loadMills();
    }
    render(){
        return (
            <div>
                {this.state.mills.map(mill =>
                    <div onClick={() => this.loadHarvests(mill.id)} key={mill.id}>{mill.name}</div>)}
            --------
                {this.state.harvests.map(harvest =>
                    <div onClick={() => this.loadFarms(harvest.code)} key={harvest.code}>{harvest.code}</div>
                )}
            --------
                {this.state.farms.map(farm =>
                    <div onClick={()=> this.props.loadFields(farm.code)} key={farm.code}>{farm.name}</div>
                )}
            </div>
        )
    }
}