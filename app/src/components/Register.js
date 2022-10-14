import { useState } from 'react'
import { register } from '../services/userService'

function Register ({ logged, setLogged }) {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  async function handleRegister (event) {
    event.preventDefault()
    try {
      await register({
        username,
        password,
        name
      })
      setError(false)
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (

    <div className='container-fluid'>
      <form onSubmit={handleRegister}>
        <div className='grid'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required='required'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required='required'
          />
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={({ target }) => setName(target.value)}
            required='required'
          />
          <button name='login-form-button'>Register</button>
        </div>
      </form>
      {error
        ? <p>{error}</p>
        : ''}
    </div>

  )
}

export default Register
