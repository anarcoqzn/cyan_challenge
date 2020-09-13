import React,{Component} from 'react';
import {Spinner, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import api from '../../../services/api'
import {toast} from 'react-toastify';

export default class FarmModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            code:null,
            name:'',
            isLoading:false,
            selectedMill:{
                name:"Select a mill"
            },
            selectedHarvest:{
                code:0
            },
            isMillsDropDownOpen:false,
            isHarvestsDropDownOpen:false
        }

        this.toggleHarvestsDropDown = this.toggleHarvestsDropDown.bind(this);
        this.handleSelectMill = this.handleSelectMill.bind(this);
        this.handleSelectHarvest = this.handleSelectHarvest.bind(this);
        this.toggleMillsDropDown = this.toggleMillsDropDown.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleCreateFarm = this.handleCreateFarm.bind(this);
        this.enableButton = this.enableButton.bind(this)
    }

    handleSelectMill(selected){
        this.setState({selectedMill:selected});
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

        this.props.toggle();
    }

    enableButton(){
        return this.state.code > 0 && !this.isEmpty() && 
               this.state.selectedMill.name != "Select a mill" && this.state.selectedHarvest.code > 0;
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
                        Create a new farm {this.state.isLoading && <Spinner color="primary" />}
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
                                                            {this.state.selectedHarvest.code}
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
                                    <Label for="Name">Farm Name</Label>
                                    <Input 
                                        onChange={this.handleName} 
                                        type="text" 
                                        name="name"
                                        valid={!this.isEmpty(this.state.name)}
                                        required
                                        />
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
                <Button onClick={this.handleCreateFarm} disabled={!this.enableButton()} color="primary">Create</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}