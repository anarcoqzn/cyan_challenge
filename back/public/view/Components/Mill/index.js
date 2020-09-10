import React, {Component} from 'react';
import api from '../../../services/api';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import{ Input, Button } from 'reactstrap';

 
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
            if(res.status == 200){this.loadHarvests();}
            else{console.log(res)}
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
                            <h5>Created by:</h5>
                            <Link to={`/harvest/${h.code}`}>Acessar</Link>
                        </div>
                        )}
                </article>
                <div className="create-new-harvest">
                    <Input
                        onChange={this.handleCodeChange}
                        placeholder="Insert a new code"
                        type="number"
                        required
                    />
                    <DatePicker
                        selected={this.state.start}
                        onChange={this.handleStartDateChange}
                    /><DatePicker
                        selected={this.state.end}
                        onChange={this.handleEndDateChange}
                    />
                    <Button onClick={this.submitHarvest} outline color="primary">Criar</Button>{' '}
                </div>
            </div>
        )
    }
}