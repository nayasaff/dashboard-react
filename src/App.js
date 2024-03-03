import React from "react"
import "./App.css"
import Orders from "./pages/Orders"
import { ThemeProvider,  createTheme } from "@mui/material"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Vendors from "./pages/Vendors"
import {Box, CssBaseline,Toolbar} from "@mui/material"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

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
      <ThemeProvider theme={theme}>
        <Router>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Sidebar/>
            <Header/>
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
              <Toolbar />
              <Routes>
                <Route path="/" element={<Orders />} />
                <Route path="/vendors" element={<Vendors />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
   
  )
}

export default App


//integrate date picker in backend
//add heighest and lowest in time taken
//sort price according to cancelled orders
//make sorting for all graphs