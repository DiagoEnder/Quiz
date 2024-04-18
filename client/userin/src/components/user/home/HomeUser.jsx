import React from 'react'

function HomeUser() {
    return (
        <div className="container-fluid " style={{ justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)', position: 'relative', background: '#ccc', display: 'flex' }}>
            {/* <img style={{ objectFit: 'cover', width: '100%', zIndex: '1' }} src="https://static.vecteezy.com/system/resources/previews/011/026/280/original/quiz-seamless-pattern-in-doodle-style-illustration-back-to-school-concept-stationery-symbols-on-chalk-board-background-pattern-hand-drawn-for-print-and-game-quiz-vector.jpg" alt="" /> */}

            <div className="row" style={{ marginTop: '-208px' }}>
                <div className="col">
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter a join code"
                        />
                        <button type="button" class="btn btn-warning" style={{ marginLeft: '3px' }}>Join</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeUser