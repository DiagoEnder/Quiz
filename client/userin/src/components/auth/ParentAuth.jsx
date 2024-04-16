import React, { useEffect, useState } from 'react'
import '../../assets/css/login.css'
import log from '../../../src/assets/img/log.svg'
import regis from '../../../src/assets/img/register.svg'
import { Outlet } from 'react-router-dom';

function ParentAuth() {
    const [usernameSI, setUsernameSI] = useState('')
    const [passSI, setPassSI] = useState('')

    const [usernameSU, setUsernameSU] = useState('')
    const [emailSU, setEmailSU] = useState('')
    const [passSU, setPassSU] = useState('')
    const [confirmPassSU, setConfirmPassSU] = useState('')
    const handleClickSignup = () => {
        const container = document.querySelector(".container");
        container.classList.add("sign-up-mode");
    }
    const handleClickSignIn = () => {
        const container = document.querySelector(".container");
        container.classList.remove("sign-up-mode");
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        alert('siginup' + usernameSU + "=" + passSU + "=" + emailSU + "=" + confirmPassSU)
    }
    const handleSignIn = (e) => {
        e.preventDefault()
        alert('signin' + usernameSI + "=" + passSI)
    }
    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
    }, [])
    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user" />
                            <input type="text" placeholder="Username" value={usernameSI} onChange={(e) => setUsernameSI(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input type="password" placeholder="Password" value={passSI} onChange={(e) => setPassSI(e.target.value)} />
                        </div>
                        <input type="submit" defaultValue="Login" className="btn solid" onClick={handleSignIn} />
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
                        <input type="submit" className="btn" defaultValue="Sign up" onClick={handleSignUp} />
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
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex
                            ratione. Aliquid!
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={handleClickSignup}>
                            Sign up
                        </button>
                    </div>
                    <img src={log} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={handleClickSignIn}>
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