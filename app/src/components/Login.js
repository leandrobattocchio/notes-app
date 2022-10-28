import { useLogin } from '../hooks/useLogin'

function Login () {
  const {
    handleLogin,
    username,
    password,
    disabled
  } = useLogin()

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className='grid'>
          <input
            {...username}
            required='required'
            placeholder='Username'
          />

          <input
            {...password}
            required='required'
            placeholder='Password'
          />
          <button aria-busy={disabled} name='login-form-button'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
