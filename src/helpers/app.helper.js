let flickerTitle = () => {
    let id = null;

    return {
        start(stateOne, stateTwo, delay) {
            id = setInterval( () => {
                if (document.title === stateOne) {
                    document.title = stateTwo;
                } else {
                    document.title = stateOne;
                }
            }, delay)
        },
        stop(state) {
            document.title = state;
            clearInterval(id);
        }
    }
}
flickerTitle = flickerTitle();

class WebSocketHelper {
    constructor(url) {
        this.url = url;
        this.socket = new WebSocket(this.url);
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
            context.setState({
                oldMessage: [],
                firstRequest: true,
                scrollBottom: !reconnecting,
            });
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
        const { isActivePage } = context.state;
        let { firstRequest } = context.state;
        let { loadMessage } = context.state;
        let { oldMessage } = context.state;
        const requiredToDownload = context.state.requiredToDownload + sizeUploadMessage;
        

        if (firstRequest) {
            oldMessage.push(...newData);
            oldMessage = oldMessage.sort((a, b) => {
                return b.time - a.time;
            });

            loadMessage = [];
        }

        if (!firstRequest && newData) {
            if (!isActivePage) {
                newData = WebSocketHelper.markMessagesUnread(newData);
            }
            loadMessage.push(...newData);
        } else  {
            loadMessage.unshift(...oldMessage.splice(0, requiredToDownload).reverse());
        }

        if (!context.state.newMessage) {
            const delay = 500;
            flickerTitle.stop('Chat');
            flickerTitle.start('Chat', 'New message +', delay);

            let id = setInterval(() => {
                if (context.state.isActivePage) {
                    flickerTitle.stop('Chat');
                    clearInterval(id);
                }
            }, delay);

        } 
        
        context.setState({
            oldMessage,
            loadMessage,
            requiredToDownload,
            firstRequest: false,  
            newMessage: !context.state.isActivePage,
        })
    }
}


const webSocketHelper = new WebSocketHelper('ws://st-chat.shas.tel')

export default webSocketHelper