import React from 'react';


export default (props) => <>
    <div className='popup'>
        <form className='popup__form' action=''>
            <h2 className='popup__title'>Enter your name</h2>

            <input className='popup__name input' type='text' placeholder='Your name' required/>

            <button className='popup__button button' onClick={ props.onClick }>Ok</button>
        </form>
    </div>
</>