import React from 'react';


export default (props) => {
    const date = new Date(props.time);
    let time = `${date.getHours()}:${date.getMinutes()}`;

    return <> 
        <div className='message'>
            <div className='message__row'>
                <span className='message__nick-name'>{ props.from }</span>
            </div>
            <div className='message__row'>
                <p className='message__text-message'>{ props.message }</p>
                <span className='message__date'>{ time }</span>
            </div>
        </div>
    </>
}