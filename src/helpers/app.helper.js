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
    }

    initEvents(events, context) {
        const { onerror, onopen, onclose, onmessage } = events;
        this.events = events;
        this.context = context;

        this.socket.onerror = (event) => {
            onerror.call(context, event);
        }
        this.socket.onopen = (event) => {
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

            this.initEvents(this.events, this.context);
        }, interval);
    }

    updateMessage(context, newData, sizeUploadMessage = 0) {
        let firstRequest = context.state.firstRequest;
        let loadMessage = context.state.loadMessage;
        let oldMessage = context.state.oldMessage;
        let isScrollBottom = false;
        const requiredToDownload = context.state.requiredToDownload + sizeUploadMessage;

        if (firstRequest) {
            oldMessage.push(...newData);
            oldMessage = oldMessage.sort((a, b) => {
                return b.time - a.time;
            });

            isScrollBottom = true;
        }

        if (!firstRequest && newData) {
            try {
                isScrollBottom = newData[newData.length - 1].from === context.state.isLogIn;
            } catch {
                isScrollBottom = false;
            }

            loadMessage.push(...newData);
        } else  {
            loadMessage.unshift(...oldMessage.splice(0, requiredToDownload).reverse());
        }

        if (!context.state.isActivePage) {
            flickerTitle.stop('Chat');
            flickerTitle.start('Chat', 'New message +', 500);
        } else {
            flickerTitle.stop('Chat');
        }
        
        context.setState({
            oldMessage,
            loadMessage,
            requiredToDownload,
            scrollBottom: isScrollBottom,   
            firstRequest: false,         
        })
    }
}


const webSocketHelper = new WebSocketHelper('ws://st-chat.shas.tel')

export default webSocketHelper