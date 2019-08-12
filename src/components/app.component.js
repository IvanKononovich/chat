import React, { Component} from 'react';

import Header from  './header.component';
import ChatContainer from './chat-container.component';
import LogInPopup from './log-in-popup.component';
import webSocketHelper from '../helpers/app.helper';


class App extends Component {
    state = { 
        isActivePage: true,
        isLogIn: window.localStorage.nickName,
        oldMessage: [],
        loadMessage: [],
        connected: false,
        requiredToDownload: 10,
        sizeUploadMessage: 10,
        scrollBottom: false,
        firstRequest: true,
        isUpdate: false,
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

    upadteMore() {
        const sizeUploadMessage = this.state.sizeUploadMessage;
        const firstOldMessage = document.querySelector('.message');

        this.setState({
            isUpdate: firstOldMessage,
        })
        
        webSocketHelper.updateMessage(this, null, sizeUploadMessage);
    }

    sendMessage(event) {
        event.preventDefault();

        const messageInput = document.querySelector('.chat__input-fields');
        const messageText = messageInput.value;

        if (this.state.connected && messageText) {
            webSocketHelper.sendData(
                JSON.stringify({
                    from: this.state.isLogIn,
                    message: messageText,
                }),
                () => {
                    messageInput.value = '';
                }
            );
        }
    }

    componentWillUpdate() {
        if (this.state.isUpdate) {
            const chat = document.querySelector('.chat');
            const scroll = this.state.isUpdate.offsetTop - chat.getBoundingClientRect().top;
            chat.scrollTop = scroll;


            this.setState({
                isUpdate: false,
            })
        }
    }

    componentDidMount() {
        webSocketHelper.initEvents({
            onerror: (error) => {
                console.log(error.message);
            },
            onopen: () => {
                this.setState({
                    connected: true,
                });
            },
            onclose: () => {
                this.setState({
                    connected: false,
                });

                webSocketHelper.reconnecting(1000);
            },
            onmessage: (event) => {
                webSocketHelper.updateMessage(this, JSON.parse(event.data));
            },
        });

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

        if (this.state.isLogIn) {
            const chat = document.querySelector('.chat');

            chat.addEventListener('scroll', (event) => {
                let scrollBottom = false;

                if (chat.scrollTop >= chat.scrollHeight - chat.clientHeight) {
                    scrollBottom = true;
                } 
                
                if (chat.scrollTop === 0) {
                    this.upadteMore();
                }

                this.setState({
                    scrollBottom: false,
                    scrollBottom,
                });
                
            })
        };
    }

    render() {
        const nickName = this.state.isLogIn;

        let renderItem = <>
            <Header 
                connected={ this.state.connected }
                nickName={ nickName } 
                onClick={() => { this.logOut() }}
            />

            <ChatContainer 
                sendMessage={(event) => { this.sendMessage(event) }} 
                loadMessage={ this.state.loadMessage }
                scrollBottom={ this.state.scrollBottom }
                isLogIn={ this.state.isLogIn }
            />
        </>;

        if (!nickName) {
            renderItem = <LogInPopup onClick={() => { this.setNickNameEvent() }}/>;
        }

        return renderItem
    }
}

export default App;