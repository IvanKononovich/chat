import React, { useLayoutEffect } from 'react';

import Message from './message.component';
import scrollToBottom from '../helpers/chat-container.helper';

export default (props) => {
    useLayoutEffect(() => {
        if (props.scrollBottom) {
            scrollToBottom('.chat');
        }
    });

    return <>
        <main className='main'>
            <div className='chat'>
                <div className='chat__message-container'>
                    {
                        props.uploadedMessages.map((item) => {
                            let additionalClassName = '';
                            if (props.isLogIn === item.from) {
                                additionalClassName += 'message_user';
                            }
                            return <Message {...item} key={item.id} additionalClassName={ additionalClassName }/>
                        })
                    }
                </div>

                <form className='chat__form' action=''>
                    <textarea className='chat__input-fields input' type='text' placeholder='Enter message' required></textarea>

                    <button className='chat__send-button button' onClick={ props.sendMessage }>send</button>
                </form>
            </div>
        </main>
    </>
}