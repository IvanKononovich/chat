import React from 'react';
import { connect } from 'react-redux';

import App from './app.component';

import { 
    changeStateAuth,
    switchPage,
    loadOldMessage,
    changeStateFirstRequest,
    updateUploadedMessages,
    changeRequiredToDownload,
    changeStateConnected,
    changeStateScrollBottom,
    changeStateIsUpdate,
} from '../../store/app/actions';

function AppContainer(props) {
    return <>
        <App 
            changeStateAuth={ props.changeStateAuth }
            switchPage={ props.switchPage }
            loadOldMessage={ props.loadOldMessage }
            changeStateFirstRequest={ props.changeStateFirstRequest }
            updateUploadedMessages={ props.updateUploadedMessages }
            changeRequiredToDownload={ props.changeRequiredToDownload }
            changeStateConnected={ props.changeStateConnected }
            changeStateScrollBottom={ props.changeStateScrollBottom }
            changeStateIsUpdate={ props.changeStateIsUpdate }

            isActivePage={ props.isActivePage }
            isLogIn={ props.isLogIn }
            oldMessage={ props.oldMessage }
            uploadedMessages={ props.uploadedMessages }
            firstRequest={ props.firstRequest }
            requiredToDownload={ props.requiredToDownload }
            connected={ props.connected }
            sizeUploadMessage={ props.sizeUploadMessage }
            scrollBottom={ props.scrollBottom }
            isUpdate={ props.isUpdate }
        />
    </>
}

function mapStateToProps(store) {
    return {
        isLogIn: store.app.isLogIn,
        isActivePage: store.app.isActivePage,
        oldMessage: store.app.oldMessage,
        firstRequest: store.app.firstRequest,
        uploadedMessages: store.app.uploadedMessages,
        requiredToDownload: store.app.requiredToDownload,
        connected: store.app.connected,
        sizeUploadMessage: store.app.sizeUploadMessage,
        scrollBottom: store.app.scrollBottom,
        isUpdate: store.app.isUpdate,
    }
}

const mapDispatchToProps = { 
    changeStateAuth,
    switchPage,
    loadOldMessage,
    changeStateFirstRequest,
    updateUploadedMessages,
    changeRequiredToDownload,
    changeStateConnected,
    changeStateScrollBottom,
    changeStateIsUpdate,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);