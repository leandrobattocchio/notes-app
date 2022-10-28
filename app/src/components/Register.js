import { useRegister } from '../hooks/useRegister'

function Register () {
  const { username, password, name, handleRegister, disabled, error } = useRegister()

  return (
    <div className='container-fluid'>
      <form onSubmit={handleRegister}>
        <div className='grid'>
          <input
            {...username}
            placeholder='Username'
            required='required'
          />
          <input
            {...password}
            placeholder='Password'
            required='required'
          />
          <input
            {...name}
            placeholder='Name'
            required='required'
          />
          <button aria-busy={disabled} name='login-form-button'>Register</button>
        </div>
      </form>
      {error
        ? <p>{error}</p>
        : ''}
    </div>

  )
}

export default Register
