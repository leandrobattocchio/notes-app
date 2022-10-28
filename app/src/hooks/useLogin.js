import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../services/userService'
import { useField } from '../hooks/useField'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })
  const [disabled, setDisabled] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setDisabled(true)
    try {
      const user = await login({
        username: username.value,
        password: password.value
      })
      dispatch({ type: '@token/login', payload: JSON.stringify(user) })
      setDisabled(false)
      navigate('/')
    } catch (error) {
      console.log(error.response.data.error)
      setDisabled(false)
    }
  }

  return {
    handleLogin,
    username,
    password,
    disabled
  }
}
