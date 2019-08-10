import React, { Component} from 'react';

import Header from  './header.component';
import ChatContainer from './chat-container.component';
import LogInPopup from './log-in-popup.component';
import { webSocketHelper } from '../helpers/app.helper';


class App extends Component {
    state = { 
        isActivePage: true,
        isLogIn: window.localStorage.nickName,
        listMessage: [],
    }

    setNickNameEvent() {
        const nickName = document.querySelector('.popup__name').value;
        window.localStorage.setItem('nickName', nickName);

        this.setState({
            isLogIn: nickName,
        })
    }

    logOut() {
        window.localStorage.clear();

        this.setState({
            isLogIn: null,
        })
    }

    sendMessage(event) {
        event.preventDefault();

        const messageText = document.querySelector('.chat__input-fields').value;

        webSocketHelper.sendData(JSON.stringify({
            from: this.state.isLogIn,
            message: messageText,
        }));
    }

    componentDidMount() {
        webSocketHelper.initEvents({
            onerror: (error) => {
                console.log(error.message);
            },
            onopen: () => {
                console.log('Соединение установлено.');
            },
            onclose: () => {
                webSocketHelper.reconnecting(1000);
            },
            onmessage: (event) => {
                const listMessage = JSON.parse(
                    JSON.stringify(this.state.listMessage)
                );
                listMessage.push(...JSON.parse(event.data));

                this.setState({
                    listMessage
                });
            },
        });
    }

    render() {
        window.addEventListener('blur', () => {
            this.setState({
                isActivePage: false,
            })
        })
        
        window.addEventListener('focus', () => {
            this.setState({
                isActivePage: true,
            })
        })


        const nickName = this.state.isLogIn;

        let renderItem = <>
            <Header 
                nickName={ nickName } 
                onClick={() => { this.logOut() }}
            />
            <ChatContainer 
                onClick={(event) => { this.sendMessage(event) }} 
                listMessage={ this.state.listMessage }
            />
        </>;

        if (!nickName) {
            renderItem = <LogInPopup onClick={() => { this.setNickNameEvent() }}/>;
        }

        return renderItem
    }
}

export default App;