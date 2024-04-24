import React, { useEffect, useState } from 'react'
import Player from './Player'
import '../../../assets/css/waiting.css'
import { GetCurrentRoom, leaveRoom } from '../../../api/room'
import { useAuth } from '../../context/AuthContext'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const socket = io.connect(process.env.REACT_APP_BASE_URL)

function MainWaiting() {
    const { token, isJoinRoom, userData } = useAuth()
    const { dataRoom, setDataRoom, setIsJoinRoom } = useState()
    const [needFetching, setNeedFetching] = useState(false)
    const [listPlayer, setListPlayer] = useState([])
    const [iDRoom, setIDRoom] = useState()
    const [headerRoom, setHeaderRoom] = useState()
    const [isOwner, setIsOwner] = useState(false)
    const navigate = useNavigate()
    const handleLeaveRoom = () => {
        leaveRoom({ IdPlayer: `${userData ? userData._id : localStorage.getItem("_idUser")}`, IdRoom: iDRoom })
            .then(res => {
                socket.emit("leaveroom", { nameUser: localStorage.getItem("name"), codeRoom: parseInt(localStorage.getItem("codeRoom")) })
                // localStorage.removeItem("codeRoom");
                // localStorage.removeItem("name");
                // localStorage.removeItem("_idUser");
                // setIsJoinRoom(false)
                navigate('/home')
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    let x = "https://act.hoyoverse.com/puzzle/upload/puzzle/2022/06/19/d05fd5736eaf5de2f119c1db55083e82_1721200333785918187.jpg"
    const fetchingRoom = () => {
        GetCurrentRoom({ codeRoom: parseInt(localStorage.getItem("codeRoom")), token })
            .then(res => {
                setHeaderRoom(res.data.data.quizId)
                console.log(res.data.data)
                setIDRoom(res.data.data._id)
                if (res.data.data.owner._id === userData._id) {
                    setIsOwner(true)
                }
                setListPlayer(res.data.data.players)
                socket.emit("joinroom", {
                    nameUser: localStorage.getItem("name"),
                    codeRoom: parseInt(localStorage.getItem("codeRoom"))
                });
            })
            .catch(err => { console.log(err) })
    }
    useEffect(() => {
        if (needFetching) {
            GetCurrentRoom({ codeRoom: parseInt(localStorage.getItem("codeRoom")), token })
                .then(res => {
                    setListPlayer(res.data.data.players)
                    setNeedFetching(false)
                })
                .catch(err => { console.log(err) })
        }
    }, [needFetching])
    useEffect(() => {
        if (!localStorage.getItem("codeRoom")) {
            navigate('/home')
        }
        else {
            fetchingRoom()
        }
    }, [])
    useEffect(() => {
        socket.on("messagejoined", (data) => {
            setNeedFetching(true)
        })
    }, [socket])
    return (
        <>
            {/* <img src={x} alt="" style={}/> */}
            <div className="" style={{ position: 'absolute', top: '40px', left: '40px' }}>
                <button className='btn-start'>
                    <span className="shadow" />
                    <span className="edge" />
                    <span className="front text" onClick={handleLeaveRoom}> Exit</span>
                </button>

            </div>
            <div className="container-fluid" style={{ backgroundImage: `url(${x})`, height: '100vh' }}>
                <div className="row">
                    <h1 className='text-center text-white'>{headerRoom && headerRoom.name}</h1>
                    <h5 className='text-center text-white'>duration/ question: {headerRoom && headerRoom.duration}s</h5>
                    <h5 className='text-center text-white'>point/ question: {headerRoom && headerRoom.points}</h5>
                </div>
                <div className="container" style={{ position: 'relative', top: '80px', height: '590px', maxHeight: '600px', overflowY: 'auto' }} >
                    <div className="row gap-3" style={{ justifyContent: 'center' }}>
                        {
                            listPlayer.length > 0 && listPlayer.map(item => (
                                <div className="col-auto">
                                    <Player name={item.name} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                {isOwner &&
                    <div className="" style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
                        <button className='btn-start'>
                            <span className="shadow" />
                            <span className="edge" />
                            <span className="front text"> Start</span>
                        </button>

                    </div>}
            </div>
        </>
    )
}

export default MainWaiting