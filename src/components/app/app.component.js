import React, { Component} from 'react';

import HeaderContainer from  '../header/header.container';
import ChatContainer from '../chat-container/chat-container.container';
import LogInPopup from './../log-in-popup.component';
import webSocketHelper from './../../helpers/app.helper';


export default class extends Component {
    setNickNameEvent() {
        const nickName = document.querySelector('.popup__name').value;
        window.localStorage.setItem('nickName', nickName);

        this.props.changeStateAuth(nickName);
    }

    upadteMore() {
        if (this.props.connected) {
            const sizeUploadMessage = this.props.sizeUploadMessage;
            const firstOldMessage = document.querySelector('.message');
    
            this.props.changeStateIsUpdate(firstOldMessage);

            webSocketHelper.updateMessage(this, null, sizeUploadMessage);
        }
    }

    sendMessage(event) {
        event.preventDefault();

        const messageInput = document.querySelector('.chat__input-fields');
        const messageText = messageInput.value;

        if (this.props.connected && messageText) {
            webSocketHelper.sendData(
                JSON.stringify({
                    from: this.props.isLogIn,
                    message: messageText,
                }),
                () => {
                    messageInput.value = '';
                }
            );

            this.props.changeStateScrollBottom(true);
        }
    }

    componentWillUpdate() {
        if (this.props.isUpdate) {
            const chat = document.querySelector('.chat');
            const scroll = this.props.isUpdate.offsetTop - chat.getBoundingClientRect().top;
            chat.scrollTop = scroll;

            this.props.changeStateIsUpdate(false);
        }
    }

    componentDidMount() {
        webSocketHelper.initEvents({
            onerror: (error) => {
                console.log(error.message);
            },
            onopen: () => {
                this.props.changeStateConnected(true);
            },
            onclose: () => {
                this.props.changeStateConnected(false);

                webSocketHelper.reconnecting(1000);
            },
            onmessage: (event) => {
                webSocketHelper.updateMessage(this, JSON.parse(event.data));
            },
        }, this);

        window.addEventListener('blur', () => {
            this.props.switchPage(false);
        });
        
        window.addEventListener('focus', () => {
            this.props.switchPage(true);
            
            setTimeout(() => {
                document.title = 'Chat';
                this.readMessages();
            }, 1500);
        });

        if (this.props.isLogIn) {
            const chat = document.querySelector('.chat');

            chat.addEventListener('scroll', () => {
                let scrollBottom = false;

                if (this.props.firstRequest) return;

                if (chat.scrollTop >= chat.scrollHeight - chat.clientHeight) {
                    scrollBottom = true;
                } 
                
                if (chat.scrollTop === 0) {
                    this.upadteMore();
                }

                this.props.changeStateScrollBottom(scrollBottom);
            });
        };
    }

    readMessages() {
        const unreadMessage = this.props.uploadedMessages.map((item) => {
            item.unread = false;
            return item;
        });

        this.props.updateUploadedMessages(unreadMessage);
    }

    render() {
        const nickName = this.props.isLogIn;

        let renderItem = <>
            <HeaderContainer />

            <ChatContainer 
                sendMessage={(event) => { this.sendMessage(event) }} 
            />
        </>;

        if (!nickName) {
            renderItem = <LogInPopup onClick={() => { this.setNickNameEvent() }}/>;
        }

        return renderItem
    }
}