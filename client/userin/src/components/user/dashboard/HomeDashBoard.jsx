import React, { useEffect, useState } from 'react'
import { GetAllQuiz } from '../../../api/quiz'
import Spinner from 'react-bootstrap/Spinner';
import Quiz from './Quiz';
import CreateQuiz from './CreateQuiz';

function HomeDashBoard() {
    const [dataQuiz, setDataQuiz] = useState([])
    const [load, setLoad] = useState(false)
    const [isError, setIsError] = useState(false)
    const FetchingData = () => {
        setLoad(true)
        GetAllQuiz()
            .then(res => {
                console.log(res.data.data)
                setDataQuiz(res.data.data)
                setLoad(false)
                setIsError(false)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
                setIsError(true)
            })
    }
    useEffect(() => {
        setLoad(true)
        GetAllQuiz()
            .then(res => {
                setDataQuiz(res.data.data)
                setLoad(false)
                setIsError(false)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
                setIsError(true)
            })
    }, [])
    return (
        <section id="courses" className="padding-medium">
            <div className="container">
                <div className="text-center mb-5">
                    <p className="text-secondary">Some of our most popular online courses</p>
                    <h2 className="display-6 fw-semibold">
                        Explore Inspiring Online Courses
                    </h2>
                    <CreateQuiz FetchingData={FetchingData} />
                </div>
                <div className="row">
                    {
                        load ?
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                            isError ? <h1>Lỗi rồi</h1>
                                :
                                dataQuiz.length > 0 ?
                                    dataQuiz.map(item => (
                                        <Quiz FetchingData={FetchingData} duration={item.duration} name={item.name} _id={item._id} id_User={item.user} grades={item.grades} subject={item.subject} imageCover={item.imageCover} />
                                    ))
                                    : <h1>Không có dữ liệu</h1>
                    }
                </div>
                <div className="text-center mt-4">
                    <a href="courses.html" className="btn btn-primary px-5 py-3">
                        View all courses
                    </a>
                </div>
            </div>
        </section>

    )
}

export default HomeDashBoard