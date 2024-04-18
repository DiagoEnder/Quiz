import React from 'react'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import HeaderHome from './HeaderHome';

function LayoutHome() {
    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <HeaderHome />
            <Outlet />
        </div>
    )
}

export default LayoutHome