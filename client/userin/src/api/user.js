import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:8000"

export const GetInfo = async ({ token }) => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/users/me`, {
        headers: {
            "Content-Type": "Application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}