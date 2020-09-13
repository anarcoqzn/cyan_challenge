import React,{Component} from 'react';
import {Spinner, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, Input } from 'reactstrap';
import api from '../../../services/api'
import {toast} from 'react-toastify';

import "../HarvestModal/styles.css"

export default class FarmModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            code:null,
            name:'',
            isLoading:false
        }

        this.handleCode = this.handleCode.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleCreateFarm = this.handleCreateFarm.bind(this);
        this.enableButton = this.enableButton.bind(this)
    }

    handleCode(event){
        this.setState({code:event.target.value})
    }

    handleName(event){
        const name = event.target.value.trim();
        this.setState({name})
    }

    handleCreateFarm(){
        const newFarm = {
            code:this.state.code,
            name:this.state.name,
            harvestCode: this.props.harvestCode
        }
        
        const headers ={
            'Content-Type':'application/json'
        }

        this.setState({isLoading:true})
        api.post("http://localhost:3333/api/farm", newFarm, headers)
        .then(res =>{
            if (res.data.error) toast.error(res.data.error)
        })
        .catch((err)=>{
            toast.error(err.message)
        })

        this.setState({isLoading:false});
        this.setState({code:null});
        this.setState({name:""});
        this.props.toggle();
    }

    enableButton(){
        return this.state.code > 0 && !this.isEmpty();
    }

    isEmpty(){
        const str = this.state.name;
        return (!str && str.length===0 && /^\s*$/.test(str) );
    }

    componentDidMount(){
        if (!String.prototype.trim) {
            String.prototype.trim = function () {
              return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
        }
    }

    render(){
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                        Create a new farm: {this.state.isLoading && <Spinner color="primary" />}
                        <p id="text">Selected harvest: {this.props.harvestCode}</p>
                </ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label for="code">Code</Label>
                            <Input 
                                onChange={this.handleCode} 
                                type="number" 
                                name="code" 
                                id="code" 
                                valid={this.state.code > 0}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                onChange={this.handleName} 
                                type="text" 
                                name="name" 
                                id="name" 
                                valid={!this.isEmpty()}
                                required
                                />
                        </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                <Button onClick={this.handleCreateFarm} disabled={!this.enableButton()} color="primary">Create</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}