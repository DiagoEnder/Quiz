import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkExistRoom, joinRoom } from '../../../api/room';
import { message } from 'antd'
import io from 'socket.io-client'

const socket = io.connect(process.env.REACT_APP_BASE_URL)

function HomeUser() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [roomId, setRoomId] = useState()
    const { userData } = useAuth()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigative = useNavigate()
    const { setIsJoinRoom } = useAuth()

    const HandleClickJoin = () => {
        if (!roomId) {
            alert('Please enter Code Room')
        }
        else {
            checkExistRoom({ codeRoom: roomId })
                .then(res => {
                    if (!userData) {
                        handleShow()
                    }
                    else {
                        joinRoom({ codeRoom: roomId, nameUser: userData.name })
                            .then(res => {
                                setIsJoinRoom(true)
                                navigative('/waiting')
                                localStorage.setItem("codeRoom", parseInt(roomId))
                                localStorage.setItem("name", userData.name)
                                localStorage.setItem("_idUser", res.data.data.players[res.data.data.players.length - 1]._id)
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => {
                    if (err.response) {
                        message.error(err.response.data.message)
                    }
                    else {
                        message.error("undefined error")
                    }
                })
            // navigative('/waiting')
        }
    }
    const handleContinue = () => {
        if (name === "") {
            alert('please enter your name')
        }
        else {
            joinRoom({ codeRoom: roomId, nameUser: name })
                .then(res => {
                    setIsJoinRoom(true)
                    navigative('/waiting')
                    socket.emit("joinroom", { nameUser: localStorage.getItem("name"), codeRoom: parseInt(localStorage.getItem("codeRoom")) })
                    localStorage.setItem("codeRoom", parseInt(roomId))
                    localStorage.setItem("name", name)
                    localStorage.setItem("_idUser", res.data.data.players[res.data.data.players.length - 1]._id)
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className="container-fluid " style={{ justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)', position: 'relative', background: '#ccc', display: 'flex' }}>
            {/* <img style={{ objectFit: 'cover', width: '100%', zIndex: '1' }} src="https://static.vecteezy.com/system/resources/previews/011/026/280/original/quiz-seamless-pattern-in-doodle-style-illustration-back-to-school-concept-stationery-symbols-on-chalk-board-background-pattern-hand-drawn-for-print-and-game-quiz-vector.jpg" alt="" /> */}
            <div className="row" style={{ marginTop: '-208px' }}>
                <div className="col">
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter a join code"
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <button type="button" class="btn btn-warning" onClick={HandleClickJoin} style={{ marginLeft: '3px' }}>Join</button>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-center"
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <input type="text" maxLength={12} value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter your name" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleContinue}>Continue</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default HomeUser