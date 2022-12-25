import { AppBar, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

const Header = () => {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()

  function handleLogout () {
    dispatch({ type: '@token/logout' })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' color='default'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' />
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          {token
            ? <Button sx={{ marginLeft: 'auto' }} color='error' variant='outlined' onClick={handleLogout}>Desloguearse</Button>
            : (
              <Box sx={{ marginLeft: 'auto' }}>
                <Button key='login' color='inherit' component={Link} to='/login'>
                  Login
                </Button>
                <Button key='register' color='inherit' component={Link} to='/register'>
                  Register
                </Button>
              </Box>
              )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
