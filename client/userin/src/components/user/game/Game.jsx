import React, { useEffect, useState } from 'react'
import '../../../assets/css/game.css'

function Game() {
    const [selectedOption, setSelectedOption] = useState(""); // State để lưu trữ giá trị của radio button được chọn
    const [time, setTime] = useState(8)
    const [showAnswer, setShowAnswer] = useState(false)
    const [checkChoiced, setCheckChoiced] = useState(false)
    // Xử lý sự kiện khi người dùng thay đổi radio button
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleShowAnswer = () => {
        alert(showAnswer)
    }
    // Xử lý sự kiện khi người dùng nhấn button
    const handleSubmit = () => {
        if (selectedOption) {
            alert('Bạn đã chọn: ' + selectedOption);
            setCheckChoiced(true)
        } else {
            alert('Vui lòng chọn một câu trả lời.');
        }
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        // Clear the interval when time reaches 0
        if (time === 0) {
            // handleShowAnswer()
            setShowAnswer(true)
            clearInterval(timer);
            setCheckChoiced(true)
            setTimeout(() => {
                setShowAnswer(false)
                setCheckChoiced(false)
                setTime(8)
            }, 3000);
        }

        // Clean up the interval on component unmount
        return () => clearInterval(timer);
    }, [time]);
    return (
        <main>
            {/* creating a modal for when quiz ends */}
            <div className="modal-container" id="score-modal">
                <div className="modal-content-container">
                    <h1>Congratulations, Quiz Completed.</h1>
                    <div className="grade-details">
                        <p>Attempts : 10</p>
                        <p>
                            Wrong Answers : <span id="wrong-answers" />
                        </p>
                        <p>
                            Right Answers : <span id="right-answers" />
                        </p>
                        <p>
                            Grade : <span id="grade-percentage" />%
                        </p>
                        <p>
                            <span id="remarks" />
                        </p>
                    </div>
                    <div className="modal-button-container">
                        <button onclick="closeScoreModal()">Continue</button>
                    </div>
                </div>
            </div>
            {/* end of modal of quiz details*/}
            <div className="game-quiz-container">
                <div className="game-details-container">
                    <h1>
                        Score : 0 / 10
                    </h1>
                    <h1>
                        {" "}
                        Question : 1 / 10
                    </h1>
                    <h1>
                        Time: {time}s
                    </h1>
                </div>
                <div className="game-question-container">
                    <h1 id="display-question" />
                    <h1>hihi</h1>
                </div>
                <div className="game-options-container">
                    <div className="modal-container" id="option-modal">
                        <div className="modal-content-container">
                            <h1>Please Pick An Option</h1>
                            <div className="modal-button-container">
                                <button onclick="closeOptionModal()">Continue</button>
                            </div>
                        </div>
                    </div>
                    {
                        showAnswer ?
                            <>
                                <span style={{ background: 'red' }}>
                                    <input
                                        type="radio"
                                        id="option-one"
                                        name="option"
                                        className="radio"
                                        defaultValue="optionA"
                                        checked={selectedOption === "optionA"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-one" className="option" id="option-one-label">Câu A</label>
                                </span>
                                <span style={{ background: 'green' }}>
                                    <input
                                        type="radio"
                                        id="option-two"
                                        name="option"
                                        className="radio"
                                        defaultValue="optionB"
                                        checked={selectedOption === "optionB"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-two" className="option" id="option-two-label">Câu B</label>
                                </span>
                                <span style={{ background: 'red' }}>
                                    <input
                                        type="radio"
                                        id="option-three"
                                        name="option"
                                        className="radio"
                                        value="optionC"
                                        checked={selectedOption === "optionC"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-three" className="option" id="option-three-label">Câu C</label>
                                </span>
                                <span style={{ background: 'red' }}>
                                    <input
                                        type="radio"
                                        id="option-four"
                                        name="option"
                                        className="radio"
                                        value="optionD"
                                        checked={selectedOption === "optionD"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-four" className="option" id="option-four-label">Câu D</label>
                                </span>
                            </>
                            :
                            <>
                                <span>
                                    <input
                                        type="radio"
                                        id="option-one"
                                        name="option"
                                        className="radio"
                                        defaultValue="optionA"
                                        checked={selectedOption === "optionA"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-one" className="option" id="option-one-label">Câu A</label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        id="option-two"
                                        name="option"
                                        className="radio"
                                        defaultValue="optionB"
                                        checked={selectedOption === "optionB"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-two" className="option" id="option-two-label">Câu B</label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        id="option-three"
                                        name="option"
                                        className="radio"
                                        value="optionC"
                                        checked={selectedOption === "optionC"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-three" className="option" id="option-three-label">Câu C</label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        id="option-four"
                                        name="option"
                                        className="radio"
                                        value="optionD"
                                        checked={selectedOption === "optionD"}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor="option-four" className="option" id="option-four-label">Câu D</label>
                                </span>
                            </>

                    }

                </div>
                <div className="next-button-container">
                    {
                        checkChoiced ?
                            <button className='btn-choiced' disabled>Submit</button>
                            :
                            <button className='btn-choice' onClick={handleSubmit}>Submit</button>
                    }
                </div>
            </div>
        </main>

    )
}

export default Game