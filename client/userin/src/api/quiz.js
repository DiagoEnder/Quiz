import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:8000"

export const GetAllQuiz = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/quiz/`)
    return data
}

export const GetDetailQuiz = async ({ _id, token }) => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/v1/quiz/${_id}`, {
        headers: {
            "Content-Type": "Application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const AddQuiz = async ({ name, grades, subject, imageCover, token }) => {
    const { data } = await axios.post(`${BASE_URL}/api/v1/quiz/`, { name, grades, subject, imageCover }, {
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data
}

// export const UpdateQuiz = async ({})