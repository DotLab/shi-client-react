import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, withRouter} from 'react-router-dom';

import './atomic.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const env = process.env.NODE_ENV;

const RoutedApp = withRouter(App);

ReactDOM.render(<BrowserRouter>
  <RoutedApp env={env}/>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
