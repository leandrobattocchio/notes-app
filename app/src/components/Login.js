import { useLogin } from '../hooks/useLogin'

function Login () {
  const {
    handleLogin,
    username,
    password,
    disabled
  } = useLogin()

  return (
    <form style={{ marginTop: '150px' }} onSubmit={handleLogin}>
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
      <button color='inherit' variant='contained' aria-busy={disabled} name='login-form-button'>Login</button>
    </form>
  )
}

export default Login
