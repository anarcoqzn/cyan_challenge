import React,{Component} from 'react';
import {Spinner, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, Input } from 'reactstrap';
import api from '../../../services/api'
import {toast} from 'react-toastify';

import '../HarvestModal/styles.css'

export default class FieldModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            code:null,
            isLoading:false
        }

        this.handleCode = this.handleCode.bind(this);
        this.handleCreateField = this.handleCreateField.bind(this);
        this.enableButton = this.enableButton.bind(this)
    }

    handleCode(event){
        this.setState({code:event.target.value})
    }

    handleCreateField(){
        const newField = {
            code:this.state.code,
            coordinates:this.props.fieldData.coordinates,
            farmCode: this.props.fieldData.farmCode
        }
        
        const headers ={
            'Content-Type':'application/json'
        }

        this.setState({isLoading:true})
        api.post("http://localhost:3333/api/field", newField, headers)
        .then(res =>{
            if (res.data.error) {
                this.setState({isLoading:false})
                toast.error(res.data.error)
                this.props.toggle();
                return;
            }else{
                this.props.loadFields(this.props.farmSelected)
                this.setState({isLoading:false})
                this.setState({code:null})
                this.props.toggle();
            }
        }
        )
        .catch((err)=>{
            toast.error(err.message)
        })
    }

    enableButton(){
        return this.state.code > 0;
    }

    render(){
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                        Create a new field {this.state.isLoading && <Spinner color="primary" />}
                        <p id="text">Farm selected: {this.props.farmSelected.name}</p>
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
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                <Button onClick={this.handleCreateField} disabled={!this.enableButton()} color="primary">Create</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}