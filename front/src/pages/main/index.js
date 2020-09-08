import React, {Component} from 'react';
import api from '../../services/api'

export default class Main extends Component{
    componentDidMount() {
        api.get('http://localhost:3333/user').then(users => {
            console.log(users);
        })
    }
    render(){
        return <h1>Hello modclima</h1>
    }
}