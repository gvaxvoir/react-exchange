import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Exchanger from './components';

ReactDOM.render(<Exchanger />, document.getElementById('root'));
registerServiceWorker();
