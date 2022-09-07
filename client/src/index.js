import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

// Ajout de Redux et des réducteurs
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

// Crée notre store pour utiliser nos réducteurs et l'extension Chrome pour déboguer le store Redux
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    // Connecte le store à notre application
    <Provider store={store}>
        <Header/>
        <App />
    </Provider>,
    document.getElementById('root')
);