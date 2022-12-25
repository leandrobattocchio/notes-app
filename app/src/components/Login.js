import { useLogin } from '../hooks/useLogin'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'

function Login () {
  const {
    handleLogin,
    username,
    password,
    disabled
  } = useLogin()

  return (
    <FormControl style={{ marginTop: '150px' }} onSubmit={handleLogin}>
      <Input
        {...username}
        required='required'
        placeholder='Username'
      />

      <Input
        {...password}
        required='required'
        placeholder='Password'
      />
      <Button color='inherit' variant='contained' aria-busy={disabled} name='login-form-button'>Login</Button>
    </FormControl>
  )
}

export default Login
