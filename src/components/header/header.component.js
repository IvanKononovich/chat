import React from 'react';

import LogOutContainer from '../log-out/log-out.container';
import ConnectionIndicatorContainer from '../connection-indicator/connection-indicator.container';

export default (props) => <>
    <header className='header header_open'>
        <div className="header__wrapper">
            <div className='header__column'>
                <h1 className='header__title'>Chat</h1>
                <ConnectionIndicatorContainer />
            </div>

            <div className='header__column'>
                <span className='header__description'>You are logged in as:</span>
                <span className='header__nickname'>{props.isLogIn}</span>
            </div>
            <div className='header__column'>    
                <LogOutContainer />
            </div>
        </div>
    </header>
</>