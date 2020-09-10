import React, {Component} from 'react';
import api from '../../../services/api';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'

import "./styles.css";

export default class Harvest extends Component{
    constructor(props){
        super(props);

        this.state = {
            harvest:{},
            farms:[],
            code: 0,
            name:""
        }

        this.loadHarvest = this.loadFarms.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.submitFarm = this.submitFarm.bind(this);
        this.isSubmitEnabled = this.isSubmitEnabled.bind(this);
    }

    handleCodeChange(event){
        this.setState({code:event.target.value});
    }

    handleNameChange(event){
        this.setState({name:event.target.value})
    }

    submitFarm(){
        const newFarm={
            "harvestCode":this.state.harvest.code,
            "code": this.state.code,
            "name": this.state.name
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        api.post("http://localhost:3333/api/farm", newFarm, headers)
        .then(res=>{
            toast.success(""+res.data)
            this.loadFarms();
            }
        ).catch(err=>{
            toast.error(""+err.message)
        })
    }

    loadFarms(){
        const {id} = this.props.match.params;
        api.get(`http://localhost:3333/api/harvest/${id}`)
        .then(res =>{
                const harvest = res.data;
                this.setState({harvest})
                this.setState({farms:res.data.farms})
            }
        )
    }

    componentDidMount(){
        this.loadFarms();
    }

    isSubmitEnabled() {
        return (this.state.code > 0 && this.state.name != "");
    }

    render(){
        const {harvest} = this.state;
        const {farms} = this.state;
        return(
            <div className="list">
                <article>
                    <h1>Harvest Code: {harvest.code}</h1>
                    {farms.map(farm =>
                        <div className="list2" key={farm.code}>
                            <p><strong>Farm name: {farm.name}</strong></p>
                            <p><strong>Farm code: {farm.code}</strong></p>
                            <p>Created at: {farm.createdAt}</p>
                            <Link to={`/farm/${farm.code}`}>Access</Link>
                        </div>
                    )}
                </article>

                <div className="create-new-farm">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input 
                            onChange={this.handleCodeChange}
                            type="number" 
                            placeholder="Farm Code" 
                            required
                            valid={this.state.code > 0}
                            value={this.state.code}
                        />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input 
                            onChange={this.handleNameChange}
                            type="text" 
                            placeholder="Farm Name" 
                            required
                            value={this.state.name}
                        />
                    </FormGroup>
                    <Button onClick={this.submitFarm} disabled={!this.isSubmitEnabled()}color="primary" >Criar</Button>
                </Form>
                </div>
            </div>
        )
    }
}