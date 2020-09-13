import React, { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import Header from './Components/Header';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';

class App extends Component {

    render() {
        return (
            <div>
                <ToastContainer 
                    hideProgressBar={true}
                />
                <Header/>
                <Home/>
            </div>
        )
    }
}

export default App;