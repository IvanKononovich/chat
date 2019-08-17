import React from 'react';
import { connect } from 'react-redux';

import LogOut from './log-out.component';
import { changeStateAuth } from '../../store/app/actions';

function LogOutContainer(props) {
    return <>
        <LogOut 
            changeStateAuth={ props.changeStateAuth } 
        />
    </>
}

const mapDispatchToProps = {
    changeStateAuth
}

export default connect(null, mapDispatchToProps)(LogOutContainer);