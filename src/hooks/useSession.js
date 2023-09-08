import { useState } from 'react'

const useSession = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    return JSON.parse(tokenString)
  }

  const getUser = () => {
    const userString = localStorage.getItem('user')
    return userString ? JSON.parse(userString) : null
  }

  const [token, setToken] = useState(getToken())
  const [currentUser, setCurrentUser] = useState(getUser())

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken)
  }

  const saveUser = (user) => {
    localStorage.setItem('user', user)
    setCurrentUser(user)
  }

  const setSession = (session) => {
    saveToken(session.token)
    saveUser(session.user)
  }

  const clearSession = () => {
    saveToken('')
    saveUser('')
  }

  return {
    setSession,
    clearSession,
    currentUser,
    token
  }
}

export { useSession }