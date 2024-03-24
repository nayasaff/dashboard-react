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
} from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import Orders from "../pages/Orders"
import ProtectedRoute from "../ProtectedRoute"
import { Route } from "react-router-dom"
import Vendors from "../pages/Vendors"
import Admin from "../pages/Admin"
import TableComponent from "../components/TableComponent"
import Avatar from "@mui/material/Avatar"

const drawerWidth = 240

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
    name: "Contact",
    icon: <ContactPage />,
  },
  {
    name: "Configuration",
    icon: <Settings />,
    link: "/configuration",
  },
]

const AppContainer = ({ children }) => {
  const location = useLocation()

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
          <Avatar sx={{ bgcolor: "blue", color: "white" }} aria-label="recipe">
            N
          </Avatar>
          <Typography variant="p" sx={{ padding: "0", margin: "0" }}>
            Naya
          </Typography>
        </Stack>
        <Divider />
        <List>
          {list.map((text, index) => (
            //Link to the respective page
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
          ))}
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
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="vendors" element={<Vendors />} />
          <Route path="configuration" element={<Admin />} />
          <Route
            path="table"
            element={
              <ProtectedRoute>
                <TableComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </Box>
  )
}

export default AppContainer
