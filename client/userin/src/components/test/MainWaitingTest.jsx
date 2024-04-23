import React, { useEffect } from 'react'
import { GetCurrentRoom } from '../../api/room'
import { useAuth } from '../context/AuthContext'
import Player from '../user/WaitingRoom/Player'

function MainWaitingTest() {
    const { token } = useAuth()
    let x = "https://act.hoyoverse.com/puzzle/upload/puzzle/2022/06/19/d05fd5736eaf5de2f119c1db55083e82_1721200333785918187.jpg"
    const fetchingRoom = () => {
        GetCurrentRoom({ codeRoom: 8968, token })
            .then(res => console.log('OK'))
            .catch(err => { console.log(err) })
    }
    useEffect(() => {
        if (token) {
            fetchingRoom()
        }
    }, [token])
    return (
        <>
            {/* <img src={x} alt="" style={}/> */}
            <div className="" style={{ position: 'absolute', top: '40px', left: '40px' }}>
                <button className='btn-start'>
                    <span className="shadow" />
                    <span className="edge" />
                    <span className="front text"> Exit</span>
                </button>

            </div>
            <div className="container-fluid" style={{ backgroundImage: `url(${x})`, height: '100vh' }}>
                <div className="row">
                    <h1 className='text-center text-white'>Đây là tên của bộ câu hỏi</h1>
                    <h5 className='text-center text-white'>Thời gian/ câu: 20s</h5>
                    <h5 className='text-center text-white'>Điểm mỗi câu: 10</h5>
                </div>
                <div className="container" style={{ position: 'relative', top: '80px', height: '590px', maxHeight: '600px', overflowY: 'auto' }} >
                    <div className="row gap-3" style={{ justifyContent: 'center' }}>
                        <div className="col-auto">
                            <Player name={'buitanhoa'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'anahime'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'conhgas'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'buitanhoa'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'anahime'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'conhgas'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'buitanhoa'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'anahime'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'conhgas'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'buitanhoa'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'anahime'} />
                        </div>
                        <div className="col-auto">
                            <Player name={'conhgas'} />
                        </div>
                    </div>
                </div>
                <div className="" style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
                    <button className='btn-start'>
                        <span className="shadow" />
                        <span className="edge" />
                        <span className="front text"> Start</span>
                    </button>

                </div>
            </div>
        </>
    )
}

export default MainWaitingTest