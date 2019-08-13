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

    updateMessage(context, newData, sizeUploadMessage = 0) {
        let firstRequest = context.state.firstRequest;
        let loadMessage = context.state.loadMessage;
        let oldMessage = context.state.oldMessage;
        const requiredToDownload = context.state.requiredToDownload + sizeUploadMessage;


        if (firstRequest) {
            oldMessage.push(...newData);
            oldMessage = oldMessage.sort((a, b) => {
                return b.time - a.time;
            });

            loadMessage = [];
        }

        if (!firstRequest && newData) {
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