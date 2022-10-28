import { useState } from 'react'
import { register } from '../services/userService'
import { useField } from '../hooks/useField'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })
  const name = useField({ type: 'text' })
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()
    setDisabled(true)
    try {
      await register({
        username: username.value,
        password: password.value,
        name: name.value
      })
      setError(false)
      setDisabled(false)
      navigate('/')
    } catch (error) {
      setDisabled(false)
      setError(error.response.data)
    }
  }

  return {
    username,
    password,
    name,
    handleRegister,
    disabled,
    error
  }
}
