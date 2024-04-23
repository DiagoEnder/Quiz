import React from 'react'
import HeaderHome from '../user/layout/HeaderHome'
import { Outlet } from 'react-router-dom'

function LayoutHomeTest() {
    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <HeaderHome />
            <Outlet />
        </div>
    )
}

export default LayoutHomeTest