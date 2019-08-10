import React from 'react';


export default () => <>
    <div className='popup'>
        <form className='popup__form' action=''>
            <h2 className='popup__title'>Enter your name</h2>

            <input className='popup__name' type='text' placeholder='Your name'/>

            <button className='popup__button'>Ok</button>
        </form>
    </div>
</>