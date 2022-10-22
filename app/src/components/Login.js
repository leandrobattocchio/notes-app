import { useState } from 'react'
import { useSelector } from 'react-redux'
import { login } from '../services/userService'

function Login ({ dispatch }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const token = useSelector(state => state.token)

  function handleLogout () {
    dispatch({ type: '@token/logout' })
  }

  async function handleLogin (event) {
    event.preventDefault()
    setDisabled(true)
    try {
      const user = await login({
        username,
        password
      })
      dispatch({ type: '@token/login', payload: JSON.stringify(user) })
      setPassword('')
      setUsername('')
      setDisabled(false)
    } catch (error) {
      console.log(error.response.data.error)
      setDisabled(false)
    }
  }

  return (
    <div>
      {
        token
          ? (
            <button onClick={handleLogout}>
              Desloguearse
            </button>)
          : (
            <form onSubmit={handleLogin}>
              <div className='grid'>
                <input
                  required='required'
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />

                <input
                  required='required'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <button aria-busy={disabled} name='login-form-button'>Login</button>
              </div>
            </form>
            )
      }
    </div>
  )
}

export default Login
