import React, { useEffect, useState } from 'react'
import { GetAllQuiz } from '../../../api/quiz'
import Spinner from 'react-bootstrap/Spinner';
import Quiz from './Quiz/Quiz';
import CreateQuiz from './Quiz/CreateQuiz';
import { useAuth } from '../../context/AuthContext';

function HomeDashBoard() {
    const [dataQuiz, setDataQuiz] = useState([])
    const { userData } = useAuth()
    const [load, setLoad] = useState(false)
    const [isError, setIsError] = useState(false)
    const [activeTab, setActiveTab] = useState('home');
    const [myQuiz, setMyQuiz] = useState()
    const [noMyQuiz, setNoMyQuiz] = useState()

    const [quizMySelf, setQuizMySelf] = useState()
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const FetchingData = () => {
        setLoad(true)
        GetAllQuiz()
            .then(res => {
                console.log(res.data.data)
                setDataQuiz(res.data.data)
                setLoad(false)
                setIsError(false)
                const filteredArray = res.data.data.filter(item => item.user === userData._id);
                const filteredArray1 = res.data.data.filter(item => item.user !== userData._id);
                setNoMyQuiz(filteredArray1)
                setMyQuiz(filteredArray)
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
                const filteredArray = res.data.data.filter(item => item.user === userData._id);
                const filteredArray1 = res.data.data.filter(item => item.user !== userData._id);
                setNoMyQuiz(filteredArray1)
                setMyQuiz(filteredArray)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
                setIsError(true)
            })
    }, [])
    return (
        <section id="courses" className="padding-medium">

            {/*  */}


            {/*  */}

            <div className="container">
                <div className="m-4">
                    <div>
                        <div className="text-center mb-5">
                            <CreateQuiz FetchingData={FetchingData} />
                        </div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a href="#" className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')}>
                                    My Self
                                </a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className={`tab-pane ${activeTab === 'home' ? 'active' : ''}`}>
                                {/* Nội dung cho trang Home */}
                                <div className="row">
                                    {
                                        load ?
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner> :
                                            isError ? <h1>Lỗi rồi</h1>
                                                :
                                                dataQuiz.length > 0 ?
                                                    noMyQuiz.map(item => (
                                                        <Quiz FetchingData={FetchingData} duration={item.duration} name={item.name} _id={item._id} id_User={item.user} grades={item.grades} subject={item.subject} imageCover={item.imageCover} />
                                                    ))
                                                    : <h1>Không có dữ liệu</h1>
                                    }
                                </div>
                            </div>
                            <div className={`tab-pane ${activeTab === 'profile' ? 'active' : ''}`}>
                                <div className="row">
                                    {
                                        load ?
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner> :
                                            isError ? <h1>Lỗi rồi</h1>
                                                :
                                                dataQuiz.length > 0 ?
                                                    myQuiz.map(item => (
                                                        <Quiz FetchingData={FetchingData} duration={item.duration} name={item.name} _id={item._id} id_User={item.user} grades={item.grades} subject={item.subject} imageCover={item.imageCover} />
                                                    ))
                                                    : <h1>Không có dữ liệu</h1>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row">
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
                </div> */}
            </div>
        </section>

    )
}

export default HomeDashBoard