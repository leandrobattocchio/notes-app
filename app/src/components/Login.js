import { useState } from 'react'
import { login } from '../services/userService'

function Login ({ logged, setLogged }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)

  function handleLogout () {
    setLogged(null)
    window.localStorage.removeItem('token')
  }

  async function handleLogin (event) {
    event.preventDefault()
    setDisabled(true)
    try {
      const user = await login({
        username,
        password
      })

      setLogged(JSON.stringify(user))
      setPassword('')
      setUsername('')
      window.localStorage.setItem('token', JSON.stringify(user))
      setDisabled(false)
    } catch (error) {
      console.log(error.response.data.error)
      setDisabled(false)
    }
  }

  return (
    <div>
      {
        logged
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
