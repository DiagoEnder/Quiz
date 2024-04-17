import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

function NotifyError({ message }) {
    return (
        <>
            <Alert variant="danger" style={{ width: '380px' }}>
                {message}
            </Alert>
        </>
    )
}

export default NotifyError