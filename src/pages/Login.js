import React from 'react'
import { Container, Box, Avatar, Typography, TextField, Grid, Link, CssBaseline, FormControlLabel, Checkbox,Button } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Login = () => {

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img alt="botit-logo" style={{margin : '1.5rem 0'}} src={require('../assets/botit.png')}/>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
              <Box sx={{display : 'flex', alignItems : 'center', justifyContent : 'end'}}>
                <Link href="/signup" variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    )
}

export default Login