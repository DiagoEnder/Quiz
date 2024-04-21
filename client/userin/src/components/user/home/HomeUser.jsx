import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomeUser() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const { userData } = useAuth()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigative = useNavigate()
    const HandleClickJoin = () => {
        if (!userData) {
            handleShow()
        }
        else {
            alert('join room')
            navigative('/waiting')
        }
    }
    const handleContinue = () => {
        if (name === "") {
            alert('please enter your name')
        }
        else {
            alert('join room')
            navigative('/waiting')
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