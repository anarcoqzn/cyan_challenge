import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history'
import App from './app.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const customHistory = createBrowserHistory();

ReactDOM.render(<Router history={customHistory}><App/></Router>,document.getElementById('app'));