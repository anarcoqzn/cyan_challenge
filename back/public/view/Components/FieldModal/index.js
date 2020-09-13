import React,{Component} from 'react';
import {Spinner, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import api from '../../../services/api'
import {toast} from 'react-toastify';

export default class FieldModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            code:null,
            isLoading:false,
        selectedMill:{
            name:"Select a mill"
        },
        selectedHarvest:{
            code:0
        },
        selectedFarm:{
            name:"Select a farm"
        },
        isMillsDropDownOpen:false,
        isHarvestsDropDownOpen:false,
        isFarmsDropDownOpen:false
    }
        this.toggleFarmsDropDown = this.toggleFarmsDropDown.bind(this);
        this.toggleHarvestsDropDown = this.toggleHarvestsDropDown.bind(this);
        this.handleSelectMill = this.handleSelectMill.bind(this);
        this.handleSelectHarvest = this.handleSelectHarvest.bind(this);
        this.toggleMillsDropDown = this.toggleMillsDropDown.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleCreateField = this.handleCreateField.bind(this);
        this.enableButton = this.enableButton.bind(this);
    }

    handleSelectMill(selected){
        this.setState({selectedMill:selected});
    }

    handleSelectFarm(selected){
        this.setState({selectedFarm:selected})
    }

    handleSelectHarvest(selected){
        this.setState({selectedHarvest:selected});
    }

    toggleMillsDropDown(){
        this.setState({isMillsDropDownOpen:!this.state.isMillsDropDownOpen})
    }

    toggleHarvestsDropDown(){
        this.setState({isHarvestsDropDownOpen:!this.state.isHarvestsDropDownOpen});
    }

    toggleFarmsDropDown(){
        this.setState({isFarmsDropDownOpen:!this.state.isFarmsDropDownOpen});
    }

    handleCode(event){
        this.setState({code:event.target.value})
    }

    handleCreateField(){
        const newField = {
            code:this.state.code,
            coordinates:this.props.fieldData.coordinates,
            farmCode: this.state.selectedFarm.code
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
                this.props.loadFields("/"+newField.code);
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
        return this.state.code > 0 && this.state.selectedMill.id && 
                this.state.selectedHarvest.code >0 && this.state.selectedFarm.code;
    }

    render(){
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                        Create a new field {this.state.isLoading && <Spinner color="primary" />}
                </ModalHeader>
                    <ModalBody>
                    <Table borderless>
                            <tbody>
                                <tr>
                                <td>
                                    <Dropdown 
                                        onClick={this.props.getMills} 
                                        isOpen={this.state.isMillsDropDownOpen}
                                        toggle={this.toggleMillsDropDown}>

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
                                    <Dropdown 
                                        onClick={this.props.getHarvests} 
                                        isOpen={this.state.isHarvestsDropDownOpen}
                                        toggle={this.toggleHarvestsDropDown}>

                                        <DropdownToggle caret>Harvest Code: 
                                                            { this.state.selectedHarvest.code}
                                                            </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.harvests.map(h =>(
                                                <DropdownItem
                                                    disabled={h.millId != this.state.selectedMill.id}
                                                    onClick={()=>this.handleSelectHarvest(h)}
                                                    key={h.code}
                                                >
                                                    Harvest Code: {h.code}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                                </tr>

                                <tr>
                                <td>
                                    <Dropdown 
                                        onClick={this.props.getFarms} 
                                        isOpen={this.state.isFarmsDropDownOpen}
                                        toggle={this.toggleFarmsDropDown}>

                                        <DropdownToggle caret>{this.state.selectedFarm.name}
                                                            </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.farms.map(f =>(
                                                <DropdownItem
                                                    disabled={f.harvestCode != this.state.selectedHarvest.code}
                                                    onClick={()=>this.handleSelectFarm(f)}
                                                    key={f.code}
                                                >
                                                    {f.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                                <td>
                                    <Label for="Code">Code</Label>
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
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                <Button onClick={this.handleCreateField} disabled={!this.enableButton()} color="primary">Create</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}