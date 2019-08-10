import React, { useLayoutEffect } from 'react';
import uniqid from 'uniqid';

import Message from './message.component';
import scrollToBottom from '../helpers/chat-container.helper';


export default (props) => {
    useLayoutEffect(() => {
        scrollToBottom('.chat__message-container');
    });

    return <>
        <main className='main'>
            <div className='container'>
                <div className='chat'>
                    <div className='chat__message-container'>
                        {
                            props.listMessage.sort((a, b) => {
                                return a.time - b.time;
                            }).map((item) => {
                                return <Message {...item} key={uniqid()}/>
                            })
                        }
                    </div>

                    <form className='chat__form' action=''>
                        <textarea className='chat__input-fields input' type='text' placeholder='Enter message' required></textarea>

                        <button className='chat__send-button button' onClick={ props.onClick }>send</button>
                    </form>
                </div>
            </div>
        </main>
    </>
}