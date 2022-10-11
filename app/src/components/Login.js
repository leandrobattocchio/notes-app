import { useState } from 'react'
import { login } from '../services/userService'

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
      const user = await login({
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
    <div className='container'>
      {
        logged
          ? (
            <button style={{ textAlign: 'right' }} onClick={handleLogout} className='btn btn-primary my-2'>
              Desloguearse
            </button>)
          : (
            <form onSubmit={handleLogin} style={{ marginLeft: '30%' }}>
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
                <button style={{ marginLeft: '3px' }} name='login-form-button' className='btn btn-primary my-2'>Login</button>
              </div>
            </form>
            )
      }
    </div>
  )
}

export default Login
