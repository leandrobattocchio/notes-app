import { useRegister } from '../../hooks/useRegister'

function RegisterForm () {
  const { username, password, name, handleRegister, disabled, error } = useRegister()

  return (
    <>
      <form onSubmit={handleRegister}>
        <div>
          <input
            {...username}
            placeholder='Username'
            required='required'
          />
        </div>
        <div>
          <input
            {...password}
            placeholder='Password'
            required='required'
          />
        </div>
        <div>
          <input
            {...name}
            placeholder='Name'
            required='required'
          />
        </div>
        <button aria-busy={disabled} name='login-form-button'>Register</button>
      </form>
      {error
        ? <p>{error}</p>
        : ''}
    </>

  )
}

export default RegisterForm
