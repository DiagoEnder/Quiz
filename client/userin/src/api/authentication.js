import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:8000"

export const LoginUser = async ({ email, password }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/v1/users/login`, { email, password }, {
        headers: {
            "Content-type": "Application/json"
        }
    })

    return data
}

export const SignUp = async ({ name, email, password, passwordConfirm }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/v1/users/signup`, { name, email, password, passwordConfirm }, {
        headers: {
            "Content-type": "Application/json"
        }
    })

    return data
}