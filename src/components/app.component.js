import React, { Component} from 'react';

import Header from  './header.component';
import ChatContainer from './chat-container.component';
import LogInPopup from './log-in-popup.component';

class App extends Component {
    state = {
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

    componentDidMount() {
        const socket = new WebSocket('ws://st-chat.shas.tel');

        socket.onopen = function() {
            console.log("Соединение установлено.");
            socket.send(JSON.stringify({
                from: 'testName',
                message: "test message",
            }));
          };
          
        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
        
        socket.onmessage = function(event) {
            console.log("Получены данные " + event.data);
        };
        
        socket.onerror = function(error) {
            console.log("Ошибка " + error.message);
        };
    }

    render() {
        const nickName = this.state.isLogIn;

        let renderItem = <>
            <Header nickName={ nickName } onClick={() => { this.logOut() }}/>
            <ChatContainer onClick={() => {  }} />
        </>;

        if (!nickName) {
            renderItem = <LogInPopup onClick={() => { this.setNickNameEvent() }}/>;
        }

        return renderItem
    }
}

export default App;