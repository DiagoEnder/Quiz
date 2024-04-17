import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const storedData = JSON.parse(localStorage.getItem('user_data'))
    const login = (newToken, newData) => {
        localStorage.setItem("user_data", JSON.stringify({ userToken: newToken, user: newData }))
        setToken(newToken)
        setUserData(newData)
    }
    const logout = () => {
        localStorage.removeItem("user_data")
        setToken(null)
        setUserData(null)
        setIsLogin(false)
    }
    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData
            setToken(userToken)
            setUserData(user)
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }
    }, [])
    return (
        <AuthContext.Provider
            value={{
                login: login,
                logout: logout,
                userData: userData,
                isLogin: isLogin,
                setIsLogin: setIsLogin,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)