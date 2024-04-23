import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:8000"

export const CreateQues = async ({ _id, token, text, options }) => {
    const { data } = await axios.post(`${BASE_URL}/api/v1/quiz/${_id}/questions`, { text, options }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    console.log(options)
    return data
}