import React, {Component} from 'react';
import api from '../../../services/api';
import { Button, Form, FormGroup, Input } from 'reactstrap';
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
    }

    handleCodeChange(event){
        this.setState({code:event.target.value});
    }

    handleLatitudeChange(event){
        this.setState({latitude:event.target.value})
    }

    handleLongitudeChange(event){

    }


    submitField(){
        const newFarm={
            "harvestCode":this.state.harvest.code,
            "code": this.state.code,
            "name": this.state.name
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
                console.log(res.data)
            }
        )
    }

    componentDidMount(){
        this.loadFields();
    }

    isSubmitEnabled() {
        return (this.state.code > 0 && this.state.name != "");
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
                            <p>Created at: {farm.createdAt}</p>
                            <Link to={`/farm/${farm.code}`}>Access</Link>
                        </div>
                    )}
                </article>

                <div className="create-new-field">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input 
                            onChange={this.handleCodeChange}
                            type="number" 
                            placeholder="Field Code" 
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
                    <Button onClick={this.submitField} disabled={!this.isSubmitEnabled()}color="primary" >Criar</Button>
                </Form>
                </div>
            </div>
        )
    }
}