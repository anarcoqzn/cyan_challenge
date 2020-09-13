import React,{Component} from 'react';
import {Spinner, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, Input } from 'reactstrap';
import api from '../../../services/api'
import {toast} from 'react-toastify';

export default class MillModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            name:"",
            isLoading:false
        }

        this.handleName = this.handleName.bind(this);
        this.handleCreateMill = this.handleCreateMill.bind(this);
        this.enableButton = this.enableButton.bind(this)
    }

    handleName(event){
        const name = event.target.value.trim();
        this.setState({name})
    }

    handleCreateMill(){
        const newMill = {
            name:this.state.name,
        }
        const headers ={
            'Content-Type':'application/json'
        }
        this.setState({isLoading:true})
        api.post("http://localhost:3333/api/mill", newMill, headers)
        .then(res =>{
            if (res.data.error) {
                toast.error(res.data.error);
             
            }

            this.setState({isLoading:false});
            this.setState({name:""});
            this.setState({isModalOpen:false});
            this.props.toggle();
        }
        )
        .catch((err)=>{
            toast.error(err.message)
        })
    }

    enableButton(){
        return (this.isEmpty(this.state.name));
    }

    isEmpty(str){
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
                        Create a new mill:{this.state.isLoading && <Spinner color="primary" />}
                </ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                onChange={this.handleName} 
                                type="text" 
                                name="name" 
                                valid={!this.isEmpty(this.state.name)}
                                required
                                />
                        </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                <Button onClick={this.handleCreateMill} disabled={this.enableButton()} color="primary">Create</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}