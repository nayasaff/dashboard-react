import React from "react"
import "./App.css"
import Orders from "./pages/Orders"
import { ThemeProvider, createTheme } from "@mui/material"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Vendors from "./pages/Vendors"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./ProtectedRoute"
import Admin from "./pages/Admin"
import AppContainer from "./components/AppContainer"
import './index.css'

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
          <Route exact path="/*" element={<AppContainer/>}/> 
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

//flex wrap in chips
//add button css
//editing password
