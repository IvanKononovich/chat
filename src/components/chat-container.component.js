import React, { useLayoutEffect } from 'react';

import Message from './message.component';
import scrollToBottom from '../helpers/chat-container.helper';
import UploadMessageButton from './upload-message-button.component';

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
                    <UploadMessageButton onClick={ props.upadteMore }/>
                    {
                        props.loadMessage.map((item) => {
                            return <Message {...item} key={item.id}/>
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