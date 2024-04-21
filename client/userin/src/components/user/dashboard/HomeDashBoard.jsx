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

                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
                        <div className="z-1 position-absolute m-4">
                            <span className="badge text-white bg-secondary">Sale</span>
                        </div>
                        <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                            <a href="courses-details.html">
                                <img
                                    src="https://themewagon.github.io/jubilee/images/item2.jpg"
                                    className="img-fluid rounded-3"
                                    alt="image"
                                />
                            </a>
                            <div className="card-body p-0">
                                <div className="d-flex justify-content-between my-3">
                                    <p className="text-black-50 fw-bold text-uppercase m-0">
                                        Digital Marketing
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <svg width={20} height={20}>
                                            <use xlinkHref="#clock" className="text-black-50" />
                                        </svg>
                                        <p className="text-black-50 fw-bold text-uppercase m-0">
                                            1h 50m
                                        </p>
                                    </div>
                                </div>
                                <a href="courses-details.html">
                                    <h5 className="course-title py-2 m-0">
                                        CyberClass 101: A Guide to Online Education
                                    </h5>
                                </a>
                                <div className="card-text">
                                    <span className="rating d-flex align-items-center mt-3">
                                        <p className="text-muted fw-semibold m-0 me-2">
                                            By: James Willam
                                        </p>
                                        <iconify-icon
                                            icon="clarity:star-solid"
                                            className="text-primary"
                                        />
                                        <iconify-icon
                                            icon="clarity:star-solid"
                                            className="text-primary"
                                        />
                                        <iconify-icon
                                            icon="clarity:star-solid"
                                            className="text-primary"
                                        />
                                        <iconify-icon
                                            icon="clarity:star-solid"
                                            className="text-primary"
                                        />
                                        <iconify-icon
                                            icon="clarity:star-solid"
                                            className="text-primary"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
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