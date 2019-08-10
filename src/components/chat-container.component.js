import React from 'react';


export default (props) => <>
    <main className='main'>
        <div className='container'>
            <div className='chat'>
                <div className='chat__posts-container'>

                </div>

                <form className='chat__form' action=''>
                    <input className='chat__input-fields input' type='text' placeholder='Enter message' required/>

                    <button className='chat__send-button button' onClick={ props.onClick }>send</button>
                </form>
            </div>
        </div>
    </main>
</>