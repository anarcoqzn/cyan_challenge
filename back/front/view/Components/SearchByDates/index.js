import React, {Component} from 'react';
import { BiSearch } from 'react-icons/bi';
import {Button, Label, ListGroupItem} from 'reactstrap';
import DatePicker from 'react-datepicker';


export default class SearchByDate extends Component{
    constructor(props){
        super(props)
    
        this.state = {
            start:null,
            end:null
        }

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.searchOnClick = this.searchOnClick.bind(this);
    }

    handleStartDate(date){
        this.setState({start: date});
    }

    handleEndDate(date){
        this.setState({end: date});
    }

    searchOnClick(){
        const params = "?start="+this.state.start+"&end="+this.state.end;
        this.props.loadHarvests(params);
    }

    render(){
        return(
            <ListGroupItem>
               <Label>{"Search harvest by dates"}</Label>
               <DatePicker 
                    selected={this.state.start}
                    onChange={this.handleStartDate}
                    required
                    placeholderText="Start Date"
                />
                <DatePicker 
                    selected={this.state.end}
                    onChange={this.handleEndDate}
                    required
                    placeholderText="End Date"
                />
                <Button 
                    disabled={this.state.start === null && this.state.end===null}
                    onClick={this.searchOnClick} 
                    color="primary">
                    <BiSearch/>
                </Button>
            </ListGroupItem>
        )
    }
}