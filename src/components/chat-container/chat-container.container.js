import React from 'react';
import { connect } from 'react-redux';

import Chat from './chat-container.component';

function ChatContainer(props) {
    return <>
        <Chat 
            sendMessage={ props.sendMessage }
            scrollBottom={ props.scrollBottom } 
            uploadedMessages={ props.uploadedMessages } 
        />
    </>
}

function mapStateToProps(store) {
    return {
        scrollBottom: store.app.scrollBottom,
        uploadedMessages: store.app.uploadedMessages,
    }
}


export default connect(mapStateToProps)(ChatContainer);