// let flickerTitle = () => {
//     let id = null;

//     return {
//         start(stateOne, stateTwo, delay) {
//             id = setInterval( () => {
//                 if (document.title === stateOne) {
//                     document.title = stateTwo;
//                 } else {
//                     document.title = stateOne;
//                 }
//             }, delay)
//         },
//         stop(state) {
//             document.title = state;
//             clearInterval(id);
//         }
//     }
// }
// flickerTitle = flickerTitle();

class WebSocketHelper {
    constructor(url) {
        this.url = url;
        this.socket = new WebSocket(this.url);
        window.socket = this.socket;
        this.idReconnecting = null;
        this.idConnectionStatusCheck = null;
    }

    initEvents(events, context, reconnecting = false) {
        const { onerror, onopen, onclose, onmessage } = events;
        this.events = events;
        this.context = context;

        this.socket.onerror = (event) => {
            onerror.call(context, event);
        }
        this.socket.onopen = (event) => {
            context.props.changeStateFirstRequest(true);
            context.props.loadOldMessage([]);
            context.props.changeStateScrollBottom(!reconnecting);

            clearInterval(this.idReconnecting);
            onopen.call(context, event);
        }
        this.socket.onclose = (event) => {
            onclose.call(context, event);
        };
        this.socket.onmessage = (event) => {
            onmessage.call(context, event);
        };;
    }

    sendData(data, callback) {
        this.socket.send(data);
        callback();
    }

    reconnecting(interval) {
        clearInterval(this.idReconnecting);

        this.idReconnecting = setInterval(() => {
            this.socket = new WebSocket(this.url);

            this.initEvents(this.events, this.context, true);
        }, interval);
    }

    static markMessagesUnread(listMessage) {
        return listMessage.map((item) => {
            item.unread = true;
            return item;
        });
    }

    updateMessage(context, newData, sizeUploadMessage = 0) {
        const { props } = context;
        const { isActivePage } = props;
        let { firstRequest } = props;
        let { uploadedMessages } = props;
        let { oldMessage } = props;
        const requiredToDownload = props.requiredToDownload + sizeUploadMessage;

        if (firstRequest) {
            oldMessage.push(...newData);
            oldMessage = oldMessage.sort((a, b) => {
                return b.time - a.time;
            });

            uploadedMessages = [];
        }

        if (!firstRequest && newData) {
            if (!isActivePage) {
                newData = WebSocketHelper.markMessagesUnread(newData);
            }
            uploadedMessages.push(...newData);
        } else  {
            uploadedMessages.unshift(...oldMessage.splice(0, requiredToDownload).reverse());
        }

        if (!isActivePage) {
            document.title = 'New message +';
        } 

        props.changeStateFirstRequest(false);
        props.loadOldMessage(oldMessage);
        props.updateUploadedMessages(uploadedMessages);
        props.changeRequiredToDownload(requiredToDownload);
    }
}


const webSocketHelper = new WebSocketHelper('ws://st-chat.shas.tel')

export default webSocketHelper