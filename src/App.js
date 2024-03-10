import React from "react"
import "./App.css"
import Orders from "./pages/Orders"
import { ThemeProvider,  createTheme } from "@mui/material"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Vendors from "./pages/Vendors"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./ProtectedRoute"
import Admin from "./pages/Admin"
import Edit from "./pages/Edit"

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
            <Route path="/" element={localStorage.getItem("token") ? <Navigate to="/orders"/> : <Navigate to="/login"/> }/>
            <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/configuration" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
            <Route path="/configuration/:id" element={<ProtectedRoute><Edit/></ProtectedRoute>}/>
            
          </Routes>
   
        </Router>
      </ThemeProvider>
   
  )
}

export default App




//frontend and backend testing
//admin can define lists of vendors for each user
//create new password 
//dropdown for many vendors
//fix hover in edit and delete button
//admin accepts reject user (fl a5er)
//admin create user