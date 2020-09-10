import React, {Component} from 'react';
import api from '../../../services/api'
import {Link} from 'react-router-dom';
import { Button, Input } from 'reactstrap';


import "./styles.css";

export default class User extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            mills:[],
            name: "",
            cpf:"11111111133"
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmitMill = this.handleSubmitMill.bind(this);
        this.loadMills = this.loadMills.bind(this);
    }

    componentDidMount(){
        this.loadMills();
    }

    loadMills() {
        api.get("http://localhost:3333/api/mill")
        .then(res => {
            const mills = res.data;
            this.setState({mills});
        })
    }
    handleNameChange(event){
        this.setState({name:event.target.value})
    }
    handleSubmitMill(){
        const data = {
            "name": this.state.name,
            "userCpf": this.state.cpf
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        
        api.post("http://localhost:3333/api/mill", data,headers)
        .then(res => {
            if(res.status == 200){this.loadMills();}
            else{console.log(res)}
        })
    }

    render(){
        const mills = this.state.mills;
        return (
            <div>
                <div className = "list">
                    {mills.map(mill =>
                    <div key={mill.id}>
                        <article><strong>{mill.name}</strong>
                            <p>Created by: {mill.owner.name}</p>
                            <Link to={`/mill/${mill.id}`}>Acessar</Link>
                        </article>
                    </div>)}
                </div>
                <div className="create-new-mill">
                    <Input
                        onChange={this.handleNameChange}
                        placeholder="Mill Name"
                        type="text"
                        required
                    />
                    <Button onClick={this.handleSubmitMill} outline color="primary">Criar</Button>{' '}
                </div>
            </div>
        )
    }
}