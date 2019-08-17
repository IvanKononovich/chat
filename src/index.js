import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './styles/index.scss';
import App from './components/app/app.container.js';
import rootReducers from './store/reducers';


const initStore = {
    app: {
        isLogIn: window.localStorage.nickName,
        connected: false,
        firstRequest: true,
        isActivePage: true,
        scrollBottom: true,
        oldMessage: [],
        uploadedMessages: [],
        requiredToDownload: 20,
        sizeUploadMessage: 10,
        isUpdate: false,
    }
}
const store = createStore(rootReducers, initStore);

render(
    <Provider store={store}>
        <App />
    </Provider>    
    , document.getElementById('root')
);


