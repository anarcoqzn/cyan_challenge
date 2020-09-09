import React, { Component } from 'react';
import User from './Components/User';
import Mill from './Components/Mill';
import {BrowserRouter,Route, Switch} from 'react-router-dom';

import Home from './Components/Home';
import Header from './Components/Header';

class App extends Component {

    render() {
        return (
            <div>
            <Header/>
                <div>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/user" component={User}/>
                            <Route path="/mill/:id" component={Mill}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default App;