import React, { useEffect } from 'react'

function QuestionDS({ text, questions, index, }) {
    useEffect(() => {
        console.log(questions)
    }, [])
    return (
        <div className="col-xl-12 mt-3">
            <div className="card mb-3 card-body">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <a href="#!.html">
                            <img
                                src="https://www.bootdesy.com/image/280x280/FF00FF/000000"
                                className="width-90 rounded-3"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="col">
                        <div className="overflow-hidden flex-nowrap">
                            <h6 className="mb-1">
                                <p className="text-reset">
                                    {text} <span>({ })</span>
                                </p>
                            </h6>
                            <div className="row align-items-center">
                                <div className="col-12">
                                    {
                                        questions[index].options.map(item => (
                                            <div className="row align-items-center g-0">
                                                <div className="col-auto">
                                                    {
                                                        item.isCorrect ?
                                                            <small className="me-2 text-success" style={{ fontWeight: '500' }}>{item.text}</small>
                                                            :
                                                            <small className="me-2 text-danger" style={{ fontWeight: '500' }}>{item.text}</small>
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionDS