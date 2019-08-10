import React, { Component} from 'react';

class App extends Component {

    componentDidMount() {
        const socket = new WebSocket('ws://st-chat.shas.tel');

        socket.onopen = function() {
            console.log("Соединение установлено.");
            socket.send(JSON.stringify({
                from: 'testName',
                message: "test message",
            }));
          };
          
        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
        
        socket.onmessage = function(event) {
            console.log("Получены данные " + event.data);
        };
        
        socket.onerror = function(error) {
            console.log("Ошибка " + error.message);
        };
    }

    render() {
        return <h1 className='title'>Title</h1>
    }
}

export default App;