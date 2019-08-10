import React from 'react';

import LogOut from './log-out.component';

export default (props) => <>
    <header className='header'>
        <div className="container">
            <div className="header__wrapper">
                <div className='header__column'>
                    <h1 className='header__title'>Chat</h1>
                </div>

                <div className='header__column'>
                    <span className='header__description'>You are logged in as:</span>
                    <span className='header__nickname'>{props.nickName}</span>
                    
                    <LogOut onClick={ props.onClick } />
                </div>
            </div>
        </div>
    </header>
</>