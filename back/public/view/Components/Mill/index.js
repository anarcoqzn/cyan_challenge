import React, {Component} from 'react';
import api from '../../../services/api';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';

 
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'

export default class Mill extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            mill: {},
            data:[],
            
            code:0,
            start: new Date(),
            end : new Date
        
        };
        this.loadHarvests = this.loadHarvests.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.submitHarvest = this.submitHarvest.bind(this);
    }

    handleCodeChange(event){
        this.setState({code:event.target.value})
        
    }

    handleStartDateChange(date){
        this.setState({start:date})
        console.log(date)

    }

    handleEndDateChange(date){
        this.setState({end:date})
    }

    submitHarvest(){
        const newHarvest = {
            "millId":this.state.mill.id,
            "code":this.state.code,
            "start":this.state.start.getTime(),
            "end":this.state.end.getTime()
        }
        const headers = {
            'Content-Type': 'application/json'
        }

        api.post("http://localhost:3333/api/harvest", newHarvest, headers)
        .then(res=>{
            toast.success(""+res.data)
            this.loadHarvests();
            }
        ).catch(res,err=>{
            toast.error(""+err.message+res.data)
        })
    }

    loadHarvests(){
        const {id} = this.props.match.params;
        api.get(`http://localhost:3333/api/mill/${parseInt(id)}`)
        .then(res => {
            const mill = res.data;
            this.setState({mill});
            this.setState({data:res.data.harvests})  
        });
    }

    componentDidMount(){
        this.loadHarvests();
    }
    
    render(){
        const harvests = this.state.data;
        const mill = this.state.mill;
        return (
            <div className="list">
                <article>
                    <h1>{mill.name}</h1>
                    {harvests.map(h =>
                        <div className="list2" key={h.code}>
                            <p><strong>Harvest Code:</strong> {h.code}</p>
                            <p><strong>Start:</strong> {h.start}</p>
                            <p><strong>End</strong>: {h.end}</p>
                            <p>Created by:</p>
                            <Link to={`/harvest/${h.code}`}>Access</Link>
                        </div>
                        )}
                </article>
                
                <div className="create-new-harvest">
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
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">Start</Label>
                            <DatePicker
                                selected={this.state.start}
                                onChange={this.handleStartDateChange}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">End</Label>
                            <DatePicker
                                selected={this.state.end}
                                onChange={this.handleEndDateChange}
                            />
                        </FormGroup>
                        <Button onClick={this.submitHarvest} color="primary">Criar</Button>
                    </Form>
                </div>
            </div>
        )
    }
}