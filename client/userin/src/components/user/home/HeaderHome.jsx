
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function HeaderHome() {
    const { logout, userData, isLogin } = useAuth()
    const navigate = useNavigate();
    const handleClickSignIn = () => {
        navigate('/auth')
    }
    useEffect(() => {
        console.log(userData)
    }, [])
    const handleClickLogout = () => {
        logout()
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">QuiZZ</Navbar.Brand>
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
                            <Button variant="secondary" size="lg" >
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
            </Container>
        </Navbar>
    )
}

export default HeaderHome