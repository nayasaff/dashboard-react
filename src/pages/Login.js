import React, { useState } from "react"
import {
  Container,
  Box,
  Typography,
  TextField,
  Link,
  CssBaseline,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import axios from "axios"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from "react-router-dom";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const Login = () => {
  //username
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState(false)

  //password
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  //show password
  const [showPassword, setShowPassword] = useState(false)

  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()
    //check if username is empty
    if (!username) {
      setUsernameError("Username is required")
    } 
    //check if password is empty
    if (!password) {
      setPasswordError("Password is required")
    }

    if(username && password){
        setUsernameError(false)
        setPasswordError(false)
        try{
           const response = await axios.post("http://localhost:5000/auth/login", {username, password})
           console.log(response)
           if(response.status === 200){
            //if response is success then save token in local storage
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('username', response.data.username)
            navigate("/orders") //navigate to homepage
           }
        }
        catch(err){
            if(err.response.data.message){
                setShowError(err.response.data.message)
            }
        }
        
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Botit logo */}
        <img
          alt="botit-logo"
          style={{ margin: "1.5rem 0" }}
          src={require("../assets/botit.png")}
        />
        {/* Log in title */}
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
            {/* Username text input */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            helperText={usernameError}
            autoComplete="Username"
            autoFocus
          />
            {/* Password text input */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError}
            InputProps={{ //This is where show password icon is added
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Log in button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(event)=> handleSubmit(event)}
          >
            Log In
          </Button>
            {/*Error message */}
            {showError && <Box sx={{display : 'flex', alignItems : 'center', gap : '0.5rem', padding : 1, borderRadius : 1, border : 2, marginBottom : '1rem' ,backgroundColor : '#FADDDC', borderColor : '#D9574D'}}>
                <ErrorOutlineIcon sx={{color : '#D9574D'}}/>
                <Typography>{showError}</Typography>
            </Box>}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default Login
