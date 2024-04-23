import React, { useEffect, useState } from 'react'
import Player from './Player'
import '../../../assets/css/waiting.css'
import { GetCurrentRoom } from '../../../api/room'
import { useAuth } from '../../context/AuthContext'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const socket = io.connect(process.env.REACT_APP_BASE_URL)

function MainWaiting() {
    const { token, isJoinRoom } = useAuth()
    const { dataRoom, setDataRoom } = useState()
    const [needFetching, setNeedFetching] = useState(false)
    const [listPlayer, setListPlayer] = useState([])
    const navigate = useNavigate()
    let x = "https://act.hoyoverse.com/puzzle/upload/puzzle/2022/06/19/d05fd5736eaf5de2f119c1db55083e82_1721200333785918187.jpg"
    const fetchingRoom = () => {
        GetCurrentRoom({ codeRoom: 8968, token })
            .then(res => {
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
            GetCurrentRoom({ codeRoom: 8968, token })
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
        fetchingRoom()
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
                    <span className="front text"> Exit</span>
                </button>

            </div>
            <div className="container-fluid" style={{ backgroundImage: `url(${x})`, height: '100vh' }}>
                <div className="row">
                    <h1 className='text-center text-white'>Đây là tên của bộ câu hỏi</h1>
                    <h5 className='text-center text-white'>Thời gian/ câu: 20s</h5>
                    <h5 className='text-center text-white'>Điểm mỗi câu: 10</h5>
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
                <div className="" style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
                    <button className='btn-start'>
                        <span className="shadow" />
                        <span className="edge" />
                        <span className="front text"> Start</span>
                    </button>

                </div>
            </div>
        </>
    )
}

export default MainWaiting