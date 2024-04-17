import React, { useEffect, useState } from 'react'
import '../../assets/css/login.css'
import log from '../../../src/assets/img/log.svg'
import regis from '../../../src/assets/img/register.svg'
import { Outlet } from 'react-router-dom';
import { LoginUser, SignUp } from '../../api/authentication';
import { message } from "antd";
import NotifyError from '../notifi/NotifyError';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';

function ParentAuth() {
    const { login } = useAuth()

    const [errorSI, setErrorSI] = useState('')
    const [errorSU, setErrorSU] = useState('')

    const [loadSI, setLoadSI] = useState(false)
    const [loadSU, setLoadSU] = useState(false)

    const [usernameSI, setUsernameSI] = useState('')
    const [passSI, setPassSI] = useState('')

    const [usernameSU, setUsernameSU] = useState('')
    const [emailSU, setEmailSU] = useState('')
    const [passSU, setPassSU] = useState('')
    const [confirmPassSU, setConfirmPassSU] = useState('')
    const handleClickSignup = () => {
        const container = document.querySelector(".container-su-si");
        container.classList.add("sign-up-mode");
    }
    const handleClickSignIn = () => {
        const container = document.querySelector(".container-su-si");
        container.classList.remove("sign-up-mode");
    }
    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoadSU(true)
        try {
            await SignUp({ name: usernameSU, email: emailSU, password: passSU, passwordConfirm: confirmPassSU })
                .then(res => {
                    console.log(res.token)
                    console.log(res.data.user)
                    login(res.token, res.data.user)
                })
            setErrorSU('')
            setLoadSU(false)
            message.success("Success SigUp")
        }
        catch (err) {
            setLoadSU(false)
            if (err.response) {
                message.destroy()
                setErrorSU(err.response.data.message)
            }
            else {
                setErrorSU('Oops! Something went wrong.')
            }
        }
    }
    const handleSignIn = async (e) => {
        setLoadSI(true)
        e.preventDefault()
        try {
            await LoginUser({ email: usernameSI, password: passSI })
                .then(res => {
                    login(res.token, res.data.user)
                })
            setErrorSI('')
            setLoadSI(false)
            message.success("Success login")
        }
        catch (err) {
            setLoadSI(false)
            if (err.response) {
                message.destroy()
                setErrorSI(err.response.data.message)
            }
            else {
                setErrorSI('Oops! Something went wrong.')
            }
        }
        // localStorage.setItem("user_data", JSON.stringify({ userToken: newToken, user: newData }))
    }
    useEffect(() => {
    }, [])
    return (
        <div className="container-su-si">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-envelope" />
                            <input type="email" placeholder="Email" value={usernameSI} onChange={(e) => setUsernameSI(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input type="password" placeholder="Password" value={passSI} onChange={(e) => setPassSI(e.target.value)} />
                        </div>
                        {
                            errorSI !== '' && <NotifyError message={errorSI} />
                        }

                        {
                            loadSI ?
                                <div className="btn-su-si solid" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                    <Spinner animation="border" className='text-center' role="status">
                                    </Spinner>
                                </div>
                                :
                                <input type="submit" defaultValue="Login" className="btn-su-si solid" onClick={handleSignIn} />
                        }
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in" />
                            </a>
                        </div>
                    </form>

                    <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user" />
                            <input type="text" placeholder="Username" value={usernameSU} onChange={(e) => setUsernameSU(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope" />
                            <input type="email" placeholder="Email" value={emailSU} onChange={(e) => setEmailSU(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input type="password" placeholder="Password" value={passSU} onChange={(e) => setPassSU(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input type="password" placeholder="Confirm Password" value={confirmPassSU} onChange={(e) => setConfirmPassSU(e.target.value)} />
                        </div>
                        {
                            errorSU !== '' && <NotifyError message={errorSU} />
                        }
                        {
                            loadSU ?
                                <div className="btn-su-si solid" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                    <Spinner animation="border" className='text-center' role="status">
                                    </Spinner>
                                </div>
                                :
                                <input type="submit" defaultValue="Login" className="btn-su-si solid" onClick={handleSignUp} />
                        }
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in" />
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Don't have an account yet? Sign up!
                        </p>
                        <button className="btn-su-si transparent" id="sign-up-btn" onClick={handleClickSignup}>
                            Sign up
                        </button>
                    </div>
                    <img src={log} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Already have an account ?</h3>
                        <p>
                            Sign In here!
                        </p>
                        <button className="btn-su-si transparent" id="sign-in-btn" onClick={handleClickSignIn}>
                            Sign in
                        </button>
                    </div>
                    <img src={regis} className="image" alt="" />
                </div>
            </div>
        </div>

    )
}

export default ParentAuth