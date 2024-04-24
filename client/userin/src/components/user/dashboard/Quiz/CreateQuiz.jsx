import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/esm/Spinner';
import { AddQuiz } from '../../../../api/quiz';
import { useAuth } from '../../../context/AuthContext';

function CreateQuiz({ FetchingData }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [grades, setGrades] = useState('1st')
    const [subject, setSubject] = useState('English')
    const [imageCover, setImgCover] = useState('')
    const [load, setLoad] = useState(false)
    const { token } = useAuth()
    const [err, setErr] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddClick = () => {
        setLoad(true)
        AddQuiz({ name: name, grades: grades, subject: subject, imageCover: imageCover, token: token })
            .then(res => {
                console.log(res.data)
                FetchingData()
                setErr('')
                setShow(false)
                setName('')
                setLoad(false)
                setGrades('1st')
                setSubject("English")
                setImgCover('')
            })
            .catch(err => {
                setLoad(false)
                if (err.response) {
                    console.log(err.response.data.message)
                    setErr(err.response.data.message)
                }
                else {
                    setErr('undefined error')
                }
            })
    }
    const handleChangeImage = (e) => {
        if (e.target.files[0]) {
            setLoad(true)
            setImgCover(e.target.files[0])
            const showImg = document.querySelector('#img-showback')
            showImg.src = URL.createObjectURL(e.target.files[0])

            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", "ml_default")
            data.append("cloudName", "duovquz2t")
            fetch("https://api.cloudinary.com/v1_1/duovquz2t/upload", {
                method: "post",
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    setImgCover(data.url.toString())
                    setLoad(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoad(false)
                })
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create Quiz
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ display: 'block', padding: 0 }}>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">
                                Name:
                            </label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="recipient-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">
                                Grades:
                            </label>
                            <select class="form-control" value={grades} onChange={(e) => setGrades(e.target.value)}>
                                <option>1st</option>
                                <option>2nd</option>
                                <option>3rd</option>
                                <option>Univerity</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">,
                                Subject:
                            </label>
                            <select class="form-control" value={subject} onChange={(e) => setSubject(e.target.value)}>
                                <option>English</option>
                                <option>Maths</option>
                                <option>History</option>
                                <option>Geography</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1" className="col-form-label">
                                ImageCover:
                            </label>
                            <div className="d-flex justify-content-between flex-wrap">
                                <img id='img-showback' style={{ minHeight: '100px', maxHeight: '200px', objectFit: 'cover', maxWidth: '400px' }} src='' alt="s" />
                                <input type="file" onChange={handleChangeImage} required className="form-control file-img" id="" accept='image/*' />
                            </div>
                        </div>
                        {
                            err !== "" &&
                            <div className="alert alert-danger" role="alert">
                                {err}
                            </div>
                        }

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        load ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                </Spinner>
                            </Button>
                            :
                            <Button variant="primary" type='submit' onClick={handleAddClick}>
                                Add
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateQuiz