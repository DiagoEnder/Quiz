import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:8000"

export const createRoom = async ({ _idquiz, IdUser, token }) => {
    const { data } = await axios.post(`${BASE_URL}/api/v1/live/startlive/${_idquiz}`, { IdUser }, {
        headers: {
            "Content-Type": "Application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const deleteRoom = async ({ _idquiz, IdOwner, IdRoom, token }) => {
    const { data: { data } } = await axios.delete(`${BASE_URL}/api/v1/live/startlive/${_idquiz}`, { IdOwner, IdRoom }, {
        headers: {
            "Content-Type": "Application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const kickPlayer = async ({ _idquiz, IdOwner, id, _idPlayers, token }) => {
    const { data } = await axios.put(`${BASE_URL}/api/v1/live/startlive/${_idquiz}`, { IdOwner, id, _idPlayers }, {
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data
}


export const startRoom = async ({ _idquiz, IdRoom, Idowner, token }) => {
    const { data } = await axios.patch(`${BASE_URL}/api/v1/live/startlive/${_idquiz}`, { Idowner, IdRoom }, {
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return data
}

// ------------Behaviour for PLayers to Room

export const checkExistRoom = async ({ codeRoom }) => {


    const { data } = await axios.post(`${BASE_URL}/api/v1/live/checkexist`, { codeRoom }, {
        headers: {
            "Content-Type": "Application/json"
        }
    })

    return data
}

export const joinRoom = async ({ codeRoom, nameUser }) => {
    console.log(`da vao api: ${nameUser} và ${codeRoom}`)
    const { data } = await axios.put(`${BASE_URL}/api/v1/live/joinedroom`, { codeRoom, nameUser }, {
        headers: {
            "Content-Type": "Application/json"
        }
    })

    return data
}

export const leaveRoom = async ({ IdPlayer, IdRoom }) => {
    const { data } = await axios.patch(`${BASE_URL}/api/v1/live/leaveroom`, { IdRoom, IdPlayer })

    return data
}

export const GetCurrentRoom = async ({ codeRoom, token }) => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/live/fetchroom?codeRoom=${8968}`, {
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    // alert

    return data
}

// export const leaveRoom = async ({IdPlayer, IdRoom }) => {
//     const { data } = await axios.patch(`${BASE_URL}/api/v1/live/leaveroom`, { IdRoom,IdPlayer })

//     return data
// }