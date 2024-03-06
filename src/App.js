import React from "react"
import "./App.css"
import Orders from "./pages/Orders"
import { ThemeProvider,  createTheme } from "@mui/material"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Vendors from "./pages/Vendors"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

//mui them
const theme = createTheme({
  palette: {
    primary: {
      main: "#17236A",
    },
    secondary: {
      main: "#f44336",
    },
  },
})



function App() {


  return (

    //theme provider for mui
      <ThemeProvider theme={theme}>

        {/* //Router for navigation */}
        <Router>
          <Routes>
            <Route path="/" element={localStorage.getItem("token") ? <Navigate to="/orders"/> : <Navigate to="login"/> }/>
            <Route path="/orders" element={<Orders />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
   
        </Router>
      </ThemeProvider>
   
  )
}

export default App




//frontend and backend testing
//fix infinite loop in console
//responsive
//admin can define lists of vendors for each user