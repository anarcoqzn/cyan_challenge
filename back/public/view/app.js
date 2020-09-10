import React, { Component } from 'react';
import User from './Components/User';
import Mill from './Components/Mill';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import Home from './Components/Home';
import Header from './Components/Header';
import Harvest from './Components/Harvest';

import 'react-toastify/dist/ReactToastify.css';
import Farm from './Components/Farm';
import Field from './Components/Field';
class App extends Component {

    render() {
        return (
            <div>
                <ToastContainer 
                    hideProgressBar={true}
                />
                <Header/>
                <div>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/user" component={User}/>
                            <Route path="/mill/:id" component={Mill}/>
                            <Route path="/harvest/:id" component={Harvest}/>
                            <Route path="/farm/:id" component={Farm}/>
                            <Route path="/field/:id" component={Field}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default App;