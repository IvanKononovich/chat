class WebSocketHelper {
    constructor(url) {
        this.url = url;
        this.socket = new WebSocket(this.url);
        this.idReconnecting = null;

        window.socket =  this.socket
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

    sendData(data) {
        this.socket.send(data);
    }

    reconnecting(interval) {
        clearInterval(this.idReconnecting);

        this.idReconnecting = setInterval(() => {
            this.socket = new WebSocket(this.url);

            this.initEvents(this.events, this.context);
        }, interval);
    }

    updateMessage(context, newData, sizeUploadMessage = 0) {
        const loadMessage = context.state.loadMessage;
        let allMessage = context.state.allMessage;

        if (newData) allMessage.push(...newData);

        allMessage = allMessage.sort((a, b) => {
            return a.time - b.time;
        });

        const requiredToDownload = context.state.requiredToDownload + sizeUploadMessage;
        let indexLastLoadMessage = context.state.indexLastLoadMessage;
        
        if (indexLastLoadMessage === null) {
            indexLastLoadMessage = allMessage.length;

            context.setState({
                indexLastLoadMessage,
                scrollBottom: true,
            });
        }

        const from = indexLastLoadMessage - requiredToDownload;
        const to = indexLastLoadMessage;

        if (from < 0) return;

        if (loadMessage.length < requiredToDownload) {
            loadMessage.unshift(...allMessage.slice(from, to))
        } else {
            loadMessage.push(allMessage.pop());
        }

        if (!context.state.isActivePage) {
            flickerTitle.stop('Chat');
            flickerTitle.start('Chat', 'New message +', 500);
        } else {
            flickerTitle.stop('Chat');
        }

        context.setState({
            allMessage,
            loadMessage,
            indexLastLoadMessage: indexLastLoadMessage - requiredToDownload,
            scrollBottom: true,
        })
    }
}

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

const webSocketHelper = new WebSocketHelper('ws://st-chat.shas.tel')

export default webSocketHelper