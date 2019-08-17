import React from 'react';


export default (props) => {
    const className =  props.connected ? 'connection-indicator_on' : 'connection-indicator_off';
    const text =  props.connected ? 'Online' : 'Offline';

    return <> 
        <div className={`connection-indicator ${className}`}>{ text }</div>
    </>
}