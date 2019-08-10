import React, { Component} from 'react';

import Header from  './header.component';
import LogInPopup from './log-in-popup.component';

class Authentication extends Component {
    state = {
        isLogIn: window.localStorage.nickName,
    }

    setNickNameEvent() {
        const nickName = document.querySelector('.popup__name').value;
        window.localStorage.setItem('nickName', nickName);

        this.setState({
            isLogIn: nickName,
        })
    }

    logOut() {
        window.localStorage.clear();

        this.setState({
            isLogIn: null,
        })
    }

    render() {
        const nickName = this.state.isLogIn;
        let renderItem = <Header nickName={ nickName } onClick={() => { this.logOut() }}/>;

        if (!nickName) {
            renderItem = <LogInPopup onClick={() => { this.setNickNameEvent() }}/>
        }

        return renderItem;
    }

}

export default Authentication;