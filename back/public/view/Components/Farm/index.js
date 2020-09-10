import React, {Component} from 'react';
import api from '../../../services/api';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'

import "./styles.css";

export default class Farm extends Component{
    constructor(props){
        super(props);

        this.state = {
            farm:{},
            fields:[],
            code:0,
            latitude:0, 
            longitude:0
        }

        this.loadFields = this.loadFields.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.submitField = this.submitField.bind(this);
        this.isSubmitEnabled = this.isSubmitEnabled.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
    }

    handleCodeChange(event){
        this.setState({code:event.target.value});
        
    }

    handleLatitudeChange(event){
        this.setState({latitude:event.target.value})
        
    }

    handleLongitudeChange(event){
        this.setState({longitude:event.target.value})
        
    }


    submitField(){
        
        const newFarm={
            "farmCode":this.state.farm.code,
            "code": this.state.code,
            "coordinates":[this.state.latitude, this.state.longitude]
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        api.post("http://localhost:3333/api/field", newFarm, headers)
        .then(res=>{
            toast.success(""+res.data)
            this.loadFields();
            }
        ).catch(err=>{
            toast.error(""+err.message)
        })
    }

    loadFields(){
        const {id} = this.props.match.params;
        api.get(`http://localhost:3333/api/farm/${id}`)
        .then(res =>{
                const farm = res.data;
                this.setState({farm})
                this.setState({fields:res.data.fields})
            }
        )
    }

    componentDidMount(){
        this.loadFields();
    }

    isSubmitEnabled() {
        return (this.state.code > 0 && this.state.latitude != 0 && this.state.longitude != 0);
    }

    render(){
        const {farm} = this.state;
        const {fields} = this.state;
        return(
            <div className="list">
                <article>
                    <h1>Farm Name: {farm.name}</h1>
                    {fields.map(field =>
                        <div className="list2" key={farm.code}>
                            <p><strong>Field code: {field.code}</strong></p>
                            <p>Created at: {field.createdAt}</p>
                            <Link to={`/field/${field.code}`}>Access</Link>
                        </div>
                    )}
                </article>

                <div className="create-new-field">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label className="mr-sm-2">Code</Label>
                        <Input 
                            onChange={this.handleCodeChange}
                            type="number" 
                            required
                            valid={this.state.code > 0}
                            value={this.state.code}
                        />
                        <Label className="mr-sm-2">Latitude</Label>
                        <Input 
                            onChange={this.handleLatitudeChange}
                            type="number" 
                            required
                            valid={this.state.latitude != 0}
                            value={this.state.latitude}
                        />
                        <Label className="mr-sm-2">Longitude</Label>
                        <Input 
                            onChange={this.handleLongitudeChange}
                            type="number" 
                            required
                            valid={this.state.longitude != 0}
                            value={this.state.longitude}
                        />
                    </FormGroup>
                    <Button onClick={this.submitField} disabled={!this.isSubmitEnabled()}color="primary" >Criar</Button>
                </Form>
                </div>
            </div>
        )
    }
}