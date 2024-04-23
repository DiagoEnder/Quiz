import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RemoveQuiz } from '../../../../api/quiz';
import { useAuth } from '../../../context/AuthContext';

function DeleteQuiz({ _id, FetchingData }) {
    const [show, setShow] = useState(false);
    const { token } = useAuth()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        RemoveQuiz({ _id, token })
            .then(res => {
                console.log("success")
                FetchingData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Button variant="primary" className='btn btn-danger' style={{ marginLeft: '6px' }} onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteQuiz