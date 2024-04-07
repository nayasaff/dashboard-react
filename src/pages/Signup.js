import React from "react"
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

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

const Signup = () => {
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState(false)

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!username) {
      setUsernameError("Username is required")
    } else if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters long")
    }

    if (!password) {
      setPasswordError("Password is required")
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 6 characters long")
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match")
    }

    if (username && password && confirmPassword === password) {
      setUsernameError(false)
      setPasswordError(false)
      setConfirmPasswordError(false)
      try {
        const response = await axios.post("http://localhost:5000/auth/signup", {
          username,
          password,
        })
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("role", response.data.role)
          navigate("/orders")
        }
      } catch (err) {
        if (err.response.data.message) setShowError(err.response.data.message)
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
        <img
          alt="botit-logo"
          style={{ margin: "1.5rem 0" }}
          src={require("../assets/botit.png")}
        />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
            InputProps={{
              // <-- This is where the toggle button is added.
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            helperText={confirmPasswordError}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(event) => handleSubmit(event)}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {/*Error message */}
          {showError && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: 1,
                borderRadius: 1,
                border: 2,
                marginBottom: "1rem",
                backgroundColor: "#FADDDC",
                borderColor: "#D9574D",
              }}
            >
              <ErrorOutlineIcon sx={{ color: "#D9574D" }} />
              <Typography>{showError}</Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Link href="/login" variant="body2">
              {"Already have an account? Log In"}
            </Link>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}


