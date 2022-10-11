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

    <div style={{ marginLeft: '25%' }} className='container'>
      <form onSubmit={handleRegister}>
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
        <button style={{ marginLeft: '3px' }} name='login-form-button' className='btn btn-primary my-2'>Register</button>
      </form>
      {error
        ? <p style={{ position: 'absolute', marginLeft: '35%', color: 'red' }}>{error}</p>
        : ''}
    </div>

  )
}

export default Register
