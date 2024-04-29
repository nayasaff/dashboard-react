import React from "react"
import { Link, Routes, useLocation } from "react-router-dom"
import { Box, Drawer, CssBaseline, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {
  Settings,
  ShoppingCart,
  SupervisorAccount,
  ContactPage,
  Logout,
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import Orders from "../pages/Orders"
import ProtectedRoute from "../ProtectedRoute"
import { Route } from "react-router-dom"
import Vendors from "../pages/Vendors"
import Admin from "../pages/Admin"
import Avatar from "@mui/material/Avatar"
import PowerBi from "../pages/PowerBi"
import { blue } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error"

const drawerWidth = { xl: 240, lg: 220, md: 200 }

const list = [
  {
    name: "Orders",
    icon: <ShoppingCart />,
    link: "/orders",
  },
  {
    name: "Vendors",
    icon: <SupervisorAccount />,
    link: "/vendors",
  },
  {
    name: "Power BI",
    icon: <ContactPage />,
    link: "/powerbi",
  },
  {
    name: "Configuration",
    icon: <Settings />,
    link: "/configuration",
  },
]

const AppContainer = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Drawer */}
      <Drawer
        sx={{
          width: { md: drawerWidth.md, lg: drawerWidth.lg },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { md: drawerWidth.md, lg: drawerWidth.lg },
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "#f44336",
          },
          display: { xs: "none", sm: "none", md: "block" },
        }}
        variant="permanent"
        anchor="left"
      >
        <Stack
          sx={{ padding: "0.7rem" }}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Avatar
            sx={{ bgcolor: blue[900], color: "white" }}
            aria-label="recipe"
          >
            {localStorage.getItem("username")[0].toUpperCase()}
          </Avatar>
          <Typography variant="p" sx={{ padding: "0", margin: "0" }}>
            {localStorage.getItem("username")}
          </Typography>
        </Stack>
        <Divider />
        <List>
          {list.map((text, index) =>
            //Link to the respective page
            text.name === "Configuration" &&
            localStorage.getItem("role") !== "admin" ? (
              <div></div>
            ) : (
              <Link key={index} to={text.link}>
                <ListItem
                  sx={{
                    backgroundColor:
                      location.pathname === text.link ? "#f21f10" : "",
                  }}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "white" }}>
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "white", textDecoration: "none" }}
                      primary={text.name}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          )}
          <ListItem disablePadding> 
            <ListItemButton onClick={()=> logout()}>
              <ListItemIcon sx={{ color: "white" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "white", textDecoration: "none" }}
                primary="Logout"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/*App Bar */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {" "}
        {/* This is for date picker */}
      </LocalizationProvider>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {/********************ROUTES********************** */}
        <Routes>
          <Route
            path="orders"
            element={
                <Orders />
            }
          />
          <Route
            path="vendors"
            element={
                <Vendors />
            }
          />

          <Route
            path="configuration"
            element={
              <ProtectedRoute adminRequired={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="powerbi" element={<PowerBi />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Box>
    </Box>
  )
}

export default AppContainer
