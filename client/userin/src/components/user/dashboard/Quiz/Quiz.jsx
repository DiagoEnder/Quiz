import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import UpdateQuiz from './UpdateQuiz'
import DeleteQuiz from './DeleteQuiz'

function Quiz({ duration, name, subject, imageCover, grades, _id, id_User, FetchingData }) {
    const { userData } = useAuth()
    return (
        <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
            <div className="z-1 position-absolute m-4">
                <span className="badge text-white bg-secondary">{grades}</span>
            </div>
            <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <NavLink to={`/home/quiz/${_id}`}>
                    <img
                        src={`${imageCover || 'https://themewagon.github.io/jubilee/images/item2.jpg'}`}
                        className="img-fluid rounded-3"
                        alt="image"
                    />
                </NavLink>
                <div className="card-body p-0">
                    <div className="d-flex justify-content-between my-3">
                        <p className="text-black-50 fw-bold text-uppercase m-0">
                            {subject}
                        </p>
                        <div className="d-flex align-items-center">
                            <svg width={20} height={20}>
                                <use xlinkHref="#clock" className="text-black-50" />
                            </svg>
                            <p className="text-black-50 fw-bold m-0">
                                {duration}s/ question
                            </p>
                        </div>
                    </div>
                    <NavLink to={`/home/quiz/${_id}`}>
                        <h5 className="course-title py-2 m-0">
                            {name}
                        </h5>
                    </NavLink>
                    <div className="card-text">
                        <span className="rating d-flex align-items-center mt-3">
                            <p className="text-muted fw-semibold m-0 me-2" style={{ display: 'block' }}>
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
                        {userData._id === id_User &&
                            <>
                                <UpdateQuiz name={name} _id={_id} subject={subject} grades={grades} imageCover={imageCover} FetchingData={FetchingData} />
                                <DeleteQuiz _id={_id} FetchingData={FetchingData} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz