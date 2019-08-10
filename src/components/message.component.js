import React from 'react';


export default (props) => {
    const date = new Date(props.time);
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minuts = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    let time = `${hours}:${minuts}`;

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