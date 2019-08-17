import { 
    CHANGE_STATE_AUTH,
    SWITCH_PAGE, 
    LOAD_OLD_MESSAGE, 
    CHANGE_STATE_FIRST_REQUEST,
    UPDATE_UPLOADED_MESSAGES,
    CHANGE_REQUIRED_TO_DOWNLOAD,
    CHANGE_STATE_CONNECTED,
    CHANGE_STATE_SCROLL_BOTTOM,
    CHANGE_STATE_IS_UPDATE,
} from './actions';


export default (store, action) => {
    switch(action.type) {
        case CHANGE_STATE_AUTH:
            return {
                ...store,
                isLogIn: action.payload,
            }

        case SWITCH_PAGE:
            return {
                ...store,
                isActivePage: action.payload,
            };

        case LOAD_OLD_MESSAGE:
            return {
                ...store,
                oldMessage: JSON.parse(JSON.stringify(action.payload)),
            };

        case CHANGE_STATE_FIRST_REQUEST:
            return {
                ...store,
                firstRequest: action.payload,
            };    

        case UPDATE_UPLOADED_MESSAGES:
            return {
                ...store,
                uploadedMessages: JSON.parse(JSON.stringify(action.payload)),
            };    
            
        case CHANGE_REQUIRED_TO_DOWNLOAD:
            return {
                ...store,
                requiredToDownload: action.payload,
            }
            
        case CHANGE_STATE_CONNECTED:
            return {
                ...store,
                connected: action.payload,
            }

        case CHANGE_STATE_SCROLL_BOTTOM:
            return {
                ...store,
                scrollBottom: action.payload,
            }

        case CHANGE_STATE_IS_UPDATE: 
            return {
                ...store,
                isUpdate: action.payload,
            }

        default:
            return {
                ...store,
            };
    }
}