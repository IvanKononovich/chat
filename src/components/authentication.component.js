import React, { Component} from 'react';

import Header from  './header.component';
import LogInPopup from './log-in-popup.component';

class Authentication extends Component {
    state = {
        isLogIn: window.localStorage.nickName,
        // isLogIn: 'Ivan',
    }

    render() {
        const nickName = this.state.isLogIn;
        let renderItem = <Header nickName={ nickName }/>;

        if (nickName === undefined) {
            renderItem = <LogInPopup />
        }

        return renderItem;
    }

}

export default Authentication;