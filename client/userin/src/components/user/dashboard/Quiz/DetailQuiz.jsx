import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { GetDetailQuiz } from '../../../../api/quiz';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QuestionDS from '../Question/QuestionDS';
import CreateQuestion from '../Question/CreateQuestion';

function DetailQuiz() {
    const { id } = useParams();
    const { token } = useAuth()
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        let tokenValue = token
        if (token) {
            GetDetailQuiz({ _id: id, token: tokenValue })
                .then(res => {
                    console.log(res.data.question)
                    setQuestions(res.data.question)
                })
                .catch(err => console.log(err))
        }
    }, [token])
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <button className='btn btn-info' style={{ padding: '0 6px' }}>Start Live</button>
                </div>
                <CreateQuestion _id={id} />
            </div>
            <div className="row">
                {
                    questions.map((item, index) => (
                        <QuestionDS text={item.text} index={index} questions={questions} />
                    ))
                }
            </div>
        </div>

    )
}

export default DetailQuiz