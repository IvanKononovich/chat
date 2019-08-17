import React from 'react';
import { connect } from 'react-redux';

import ConnectionIndicator from './connection-indicator.component';

function ConnectionIndicatorContainer(props) {
    return <>
        <ConnectionIndicator 
            connected={ props.connected }
        />
    </>
}

function mapStateToProps(store) {
    return {
        connected: store.app.connected,
    }
}

export default connect(mapStateToProps)(ConnectionIndicatorContainer);