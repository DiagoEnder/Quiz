import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useAuth } from '../../../context/AuthContext';
import { CreateQues } from '../../../../api/question';

function CreateQuestion({ _id }) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('')
    const [question, setQuestion] = useState(['', '', '', ''])
    const [quesCorrect, setQuesCorrect] = useState(question[0])
    const [load, setLoad] = useState(false)
    const { token } = useAuth()
    const [err, setErr] = useState('')
    const [selectedOption, setSelectedOption] = useState('a');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddClick = () => {
        if (question[0] === '' || question[1] === '' || question[2] === '' || question[3] === '') {
            alert('Please provide all possible answers to the question')
        }
        else {
            let answers = [];
            for (let i = 0; i <= 3; i++) {
                let answer = { text: question[i] };
                if (question[i] === quesCorrect) {
                    answer.isCorrect = true;
                }
                answers.push(answer);
            }
            setLoad(true)
            CreateQues({ _id, token, text, options: answers })
                .then(res => {
                    console.log(res.data)
                    // FetchingData()
                    setErr('')
                    setShow(false)
                    setLoad(false)
                })
                .catch(err => {
                    setLoad(false)
                    if (err.response) {
                        console.log(err.response.data.message)
                        setErr(err.response.data.message)
                    }
                    else {
                        setErr('undefined error')
                    }
                })
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Question
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ display: 'block', padding: 0 }}>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">
                                Question:
                            </label>
                            <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} id="recipient-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">
                                A:
                            </label>
                            <input type="text" className="form-control" value={question[0]} onChange={(e) => {
                                const newValue = e.target.value;
                                const newQuestion = [...question];
                                newQuestion[0] = newValue;
                                setQuestion(newQuestion);
                            }} id="recipient-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">
                                B:
                            </label>
                            <input type="text" className="form-control" value={question[1]} onChange={(e) => {
                                const newValue = e.target.value;
                                const newQuestion = [...question];
                                newQuestion[1] = newValue;
                                setQuestion(newQuestion);
                            }} id="recipient-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">
                                C:
                            </label>
                            <input type="text" className="form-control" value={question[2]} onChange={(e) => {
                                const newValue = e.target.value;
                                const newQuestion = [...question];
                                newQuestion[2] = newValue;
                                setQuestion(newQuestion);
                            }} id="recipient-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">
                                D:
                            </label>
                            <input type="text" className="form-control" value={question[3]} onChange={(e) => {
                                const newValue = e.target.value;
                                const newQuestion = [...question];
                                newQuestion[3] = newValue;
                                setQuestion(newQuestion);
                            }} id="recipient-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">
                                Question correct:
                            </label>
                            <select class="form-control" value={quesCorrect} onChange={(e) => setQuesCorrect(e.target.value)}>
                                <option>A: {question[0]}</option>
                                <option>B: {question[1]}</option>
                                <option>C: {question[2]}</option>
                                <option>D: {question[3]}</option>
                            </select>
                        </div>
                        {
                            err !== "" &&
                            <div className="alert alert-danger" role="alert">
                                {err}
                            </div>
                        }

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        load ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                </Spinner>
                            </Button>
                            :
                            <Button variant="primary" type='submit' onClick={handleAddClick}>
                                Add
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateQuestion