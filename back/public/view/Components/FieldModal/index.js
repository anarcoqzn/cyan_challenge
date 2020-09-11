import React,{Component} from 'react';
import {FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, Input } from 'reactstrap';
import api from '../../../services/api'
import {toast} from 'react-toastify';

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
                toast.error(res.data.error)
                return
            }
            toast.success(`Field created successfully with code '${res.data.code}'`)
            this.props.loadFields(this.props.fieldData.farmCode)
        }
        )
        .catch((err)=>{
            toast.error(err.message)
        })
        this.setState({isLoading:false})
        this.setState({code:null})
        this.props.toggle();
    }

    enableButton(){
        return this.state.code > 0;
    }

    render(){
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                        Create a new field:{this.state.isLoading && <div>Loading</div>}
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