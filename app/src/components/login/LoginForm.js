import { useLogin } from '../../hooks/useLogin'
import './login-form.css'

function LoginForm () {
  const {
    handleLogin,
    username,
    password,
    disabled
  } = useLogin()

  return (
    <form style={{ marginTop: '150px' }} onSubmit={handleLogin}>
      <div className='input-form-login'>
        <input
          {...username}
          required='required'
          placeholder='Username'
        />
      </div>
      <div className='input-form-login'>
        <input
          {...password}
          required='required'
          placeholder='Password'
        />
      </div>
      <button color='inherit' variant='contained' aria-busy={disabled} name='login-form-button'>Login</button>
    </form>
  )
}

export default LoginForm
