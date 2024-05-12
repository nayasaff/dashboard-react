import React from "react"
import "./App.css"
import { ThemeProvider, createTheme } from "@mui/material"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./pages/Login"
import AppContainer from "./components/AppContainer"
import './index.css'
import ProtectedRoute from "./ProtectedRoute"

//mui them
const theme = createTheme({
  palette: {
    primary: {
      main: "#17236A",
    },
    secondary: {
      main: "#f44336",
    },
    background : {
      default: "#f6f8fa"
    }
  },
  breakpoints : {
    values : {
      sm :0,
      md :769,
      lg : 1024,
      xl : 1216
    }
  }
})

function App() {
  return (
    //theme provider for mui
    <ThemeProvider theme={theme}>
      {/* //Router for navigation */}
      <Router>
        <Routes>
           <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/orders" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />           
          <Route path="/login" element={<Login />} />
          <Route exact path="/*" element={<ProtectedRoute><AppContainer/></ProtectedRoute> }/> 
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

//flex wrap in chips
//add button css
//editing password
