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
}

const webSocketHelper = new WebSocketHelper('ws://st-chat.shas.tel')

export  {
    webSocketHelper
};