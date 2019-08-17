import React from 'react';
import { connect } from 'react-redux';

import Header from './header.component';

function HeaderContainer(props) {
    return <>
        <Header 
            isLogIn={ props.isLogIn }
        />
    </>
}

function mapStateToProps(store) {
    return {
        isLogIn: store.app.isLogIn,
    }
}

export default connect(mapStateToProps)(HeaderContainer);
