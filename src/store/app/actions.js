const CHANGE_STATE_AUTH = 'CHANGE_STATE_AUTH';
const SWITCH_PAGE = 'SWITCH_PAGE';
const LOAD_OLD_MESSAGE = 'LOAD_OLD_MESSAGE';
const CHANGE_STATE_FIRST_REQUEST = 'CHANGE_STATE_FIRST_REQUEST';
const UPDATE_UPLOADED_MESSAGES = 'UPDATE_UPLOADED_MESSAGES';
const CHANGE_REQUIRED_TO_DOWNLOAD = 'CHANGE_REQUIRED_TO_DOWNLOAD';
const CHANGE_STATE_CONNECTED = 'CHANGE_STATE_CONNECTED';
const CHANGE_STATE_SCROLL_BOTTOM = 'CHANGE_STATE_SCROLL_BOTTOM';
const CHANGE_STATE_IS_UPDATE = 'CHANGE_STATE_IS_UPDATE';


function changeStateAuth(userName) {
    return {
        type: CHANGE_STATE_AUTH,
        payload: userName,
    }
}

function switchPage(isActivePage) {
    return {
        type: SWITCH_PAGE,
        payload: isActivePage,
    }
}

function loadOldMessage(data) {
    return {
        type: LOAD_OLD_MESSAGE,
        payload: data,
    }
}

function changeStateFirstRequest(state) {
    return {
        type: CHANGE_STATE_FIRST_REQUEST,
        payload: state,
    }
}

function updateUploadedMessages(data) {
    return {
        type: UPDATE_UPLOADED_MESSAGES,
        payload: data,
    }
}

function changeRequiredToDownload(number) {
    return {
        type: CHANGE_REQUIRED_TO_DOWNLOAD,
        payload: number,
    }
}

function changeStateConnected(state) {
    return {
        type: CHANGE_STATE_CONNECTED,
        payload: state,
    }
}

function changeStateScrollBottom(state) {
    return {
        type: CHANGE_STATE_SCROLL_BOTTOM,
        payload: state,
    }
}

function changeStateIsUpdate(state) {
    return {
        type: CHANGE_STATE_IS_UPDATE,
        payload: state,
    }
}

export {
    CHANGE_STATE_AUTH,
    SWITCH_PAGE,
    LOAD_OLD_MESSAGE,
    CHANGE_STATE_FIRST_REQUEST,
    UPDATE_UPLOADED_MESSAGES,
    CHANGE_REQUIRED_TO_DOWNLOAD,
    CHANGE_STATE_CONNECTED,
    CHANGE_STATE_SCROLL_BOTTOM,
    CHANGE_STATE_IS_UPDATE,
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
