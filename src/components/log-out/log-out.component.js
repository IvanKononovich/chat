import React from 'react';


export default (props) => <>
    <button className='log-out' onClick={ () => {
        window.localStorage.clear();
        props.changeStateAuth() 
    }}>Log out</button>
</>