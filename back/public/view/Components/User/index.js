import React, {Component} from 'react';
import axios from 'axios';

export default class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            mills:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3333/mill')
        .then(res => {
            const mills = res.data;
            console.log(mills)
            this.setState({mills})
        })
    }

    render(){
        return <div>
            {this.state.mills.map(mill => <li>{mill.name}</li>)}
        </div>
    }
}