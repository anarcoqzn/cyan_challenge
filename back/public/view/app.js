import React, { Component } from 'react';
import User from './Components/User'

class App extends Component {
    render() {
        return <div><User/></div>;
    }
}

export default App  

/*<Switch>
                <Route path="/">
                    <Mill/>
                </Route>
                <Route path="/mill/:id">
                    <ShowMill />
                </Route>
                <Route path="/fields">
                    <Fields />
                </Route>
                <Route path="/fields/:id">
                    <ShowField />
                </Route>
            </Switch>*/