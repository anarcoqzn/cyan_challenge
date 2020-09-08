import React, {Component} from 'react';
import axios from 'axios';
import MillEl from '../Mill';

export default class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            mills:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3333/api/mill")
        .then(res => {
            const mills = res.data;
            this.setState({mills});
            console.log(this.state.mills)
        })

    }

    render(){
        return (
            <ul>
              { this.state.mills.map(mill => <MillEl key={mill.name} {...mill}/>)}
            </ul>
        )
    }
}