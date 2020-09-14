import React,{Component} from 'react';
import {Table, Spinner, Label, Button, Modal, ModalHeader, 
        ModalBody, ModalFooter, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import api from '../../../services/api'
import {toast} from 'react-toastify';
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

export default class HarvestModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            code:null,
            start:null,
            end:null,
            isLoading:false,
            isDropDownOpen:false,
            selectedMill:{
                name:"Select a mill"
            }
        }
        
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleCreateharvest = this.handleCreateharvest.bind(this);
        this.enableButton = this.enableButton.bind(this);
    }

    handleSelectMill(selected){
        this.setState({selectedMill:selected})
    }

    toggleDropDown(){
        this.setState({isDropDownOpen:!this.state.isDropDownOpen})
    }

    handleCode(event){
        this.setState({code:event.target.value})
    }

    handleStartDate(date){
        this.setState({start: date});
    }

    handleEndDate(date){
        this.setState({end: date});
    }

    handleCreateharvest(){
        const newHarvest = {
            code:this.state.code,
            start: this.state.start,
            end: this.state.end,
            millId:this.state.selectedMill.id
        }
        
        const headers ={
            'Content-Type':'application/json'
        }
        this.setState({isLoading:true})
        api.post("http://localhost:3333/api/harvest", newHarvest, headers)
        .then(res =>{

            if (res.data.error) {
                toast.error(res.data.error); 
            }

            this.setState({isLoading:false});
            this.setState({code:null})
            this.setState({start:null})
            this.setState({end:null})
            this.props.toggle()
            return;
        })
        .catch((err)=>{
            toast.error(err.message)
        })
    }

    enableButton(){
        return (this.state.code > 0 && this.state.start != null && this.state.end != null);
    }

    render(){
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                        Create a new harvest {this.state.isLoading && <Spinner color="primary" />}
                </ModalHeader>
                    <ModalBody>

                        <Table borderless>
                            <tbody>
                                <tr>
                                <td>
                                    <Dropdown 
                                        onClick={this.props.getMills} 
                                        isOpen={this.state.isDropDownOpen}
                                        toggle={this.toggleDropDown}>

                                        <DropdownToggle caret>{this.state.selectedMill.name}</DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.mills.map(m =>
                                                <DropdownItem
                                                    onClick={()=>this.handleSelectMill(m)}
                                                    key={m.id}
                                                >
                                                    {m.name}
                                                </DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                                <td>
                                <   Label for="Code">Code</Label>
                                    <Input 
                                        onChange={this.handleCode} 
                                        type="number"
                                        name="code" 
                                        id="code"  
                                        valid={this.state.code > 0}
                                        required
                                    />
                                </td>
                                </tr>

                                <tr>
                                <td>
                                    <Label for="Start">Start Date</Label>
                                    <DatePicker 
                                        selected={this.state.start}
                                        onChange={this.handleStartDate}
                                        required
                                    />
                                </td>
                                <td>
                                    <Label for="End">End Date</Label>
                                    <DatePicker 
                                        selected={this.state.end}
                                        onChange={this.handleEndDate}
                                        required
                                        />
                                </td>
                                </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                <Button onClick={this.handleCreateharvest} disabled={!this.enableButton()} color="primary">Create</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}