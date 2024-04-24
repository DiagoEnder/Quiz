
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { GetInfo } from '../../../api/user';

function HeaderHome() {
    const { logout, userData, isLogin, token } = useAuth()
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const handleClickSignIn = () => {
        navigate('/auth')
    }
    const handleClickDashBoard = () => {
        navigate('/home/dashboard')
    }
    useEffect(() => {
        if (token) {
            GetInfo({ token })
                .then(res => {
                    console.log(res.data.data)
                    setUser(res.data.data)
                })
                .catch(err => console.log(err))
        }
    }, [token])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClickLogout = () => {
        logout()
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => { navigate('/home') }}>QuiZZ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            {
                                isLogin && userData &&
                                <Button variant="secondary" size="lg" onClick={handleClickDashBoard}>
                                    {userData.name} dashboard
                                </Button>
                            }
                            {
                                isLogin ?
                                    <Button variant="danger" size="lg" onClick={handleClickLogout}>
                                        Logout
                                    </Button>
                                    :
                                    <Button variant="info" size="lg" onClick={handleClickSignIn}>
                                        Sign In
                                    </Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <Button variant="info" size="lg" onClick={handleShow}>
                        Info
                    </Button>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    name: {user && user.name}
                    <br />
                    email: {user && user.email}
                    <br />
                    role: {user && user.role}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default HeaderHome