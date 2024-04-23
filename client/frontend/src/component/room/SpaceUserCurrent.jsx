import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import {joinRoom} from './../../handleAPI/room'


function SpaceUserCurrent({codeRoom}) {
    const [nameUser, setName] = useState()
    
    const submitName = async (e) => {
        e.preventDefault();
        console.log(name)
        const dataRoom = await joinRoom({codeRoom, nameUser})
        if(dataRoom) {
            infor(true)
            sessionStorage.setItem('joined', true)  
        }
      
    }
    return (
        <>
            <div>
                <form onSubmit={submitName}>           
                    <input required placeholder='Enter your name' value={nameUser} onChange={(e)=> setName(e.target.value)} />          
                    <button className='join-btn' type='submit'>Start</button>
                </form>
            </div>
        </>
    );
}

export default SpaceUserCurrent


