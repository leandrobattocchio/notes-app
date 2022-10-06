import { useState } from 'react'
import userService from '../services/userService'

function Login ({ logged, setLogged }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleLogout () {
    setLogged(null)
    window.localStorage.removeItem('token')
  }

  async function handleLogin (event) {
    event.preventDefault()
    try {
      const user = await userService.login({
        username,
        password
      })

      setLogged(JSON.stringify(user))
      setPassword('')
      setUsername('')
      window.localStorage.setItem('token', JSON.stringify(user))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        {
          logged
            ? (
              <button onClick={handleLogout}>
                Desloguearse
              </button>)
            : (
              <div>
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />

                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <button name='login-form-button'>Login</button>
              </div>)

        }
      </form>
    </div>
  )
}

export default Login
