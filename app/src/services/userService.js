import axios from 'axios'


const login = async credentials => {
  const baseUrl = '/api/login'

  const { data } = await axios.post(baseUrl, credentials)
  return data
}

const register = async credentials => {
  const baseUrl = '/api/users/'
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export { login, register }
