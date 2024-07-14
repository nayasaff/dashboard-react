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
import { TableChartOutlined, Settings, ShoppingCart } from "@mui/icons-material"
import { SupervisorAccount, Logout, Memory } from "@mui/icons-material"
import Orders from "../pages/Orders"
import ProtectedRoute from "../ProtectedRoute"
import { Route } from "react-router-dom"
import Vendors from "../pages/Vendors"
import Admin from "../pages/Admin"
import Avatar from "@mui/material/Avatar"
import { blue } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error"
import { IconButton, Toolbar, AppBar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import axios from "axios"
import AppSnackbar from "./snackbar/AppSnackbar"

const drawerWidth = { xl: 240, lg: 100, md: 100 }

const AppContainer = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "#f44336",
          display: { md: "none" },
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
            lg: `calc(100% - ${drawerWidth.lg}px)`,
            xl: `calc(100% - ${drawerWidth.xl}px)`,
            md: `calc(100% - ${drawerWidth.md}px)`,
          },
          ml: {
            lg: `${drawerWidth.lg}px`,
            xl: `${drawerWidth.xl}px`,
            md: `${drawerWidth.md}px`,
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: {
            lg: drawerWidth.lg,
            xl: drawerWidth.xl,
            md: drawerWidth.md,
          },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/**********************************************RESPONSIVE DRAWER FOR MOBILES************************************************ */}
        <Drawer
          variant="temporary"
          container={container}
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              backgroundColor: "#f44336",
              color: "white",
              width: "45%",
            },
          }}
        >
          <DrawerApp />
        </Drawer>
        {/**********************************************PERMANENT DRAWER************************************************ */}
        <Drawer
          variant="permanent"
          sx={{
            display: { sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: {
                lg: isHovered ? drawerWidth.xl : drawerWidth.lg,
                xl: drawerWidth.xl,
                md: isHovered ? drawerWidth.xl : drawerWidth.md,
              },
              backgroundColor: "#f44336",
              color: "white",
              overflowY: "visible",
            },
          }}
          open
          onMouseEnter={() => setIsHovered(true)} // Show drawer on mouse enter
          onMouseLeave={() => setIsHovered(false)}
        >
          <DrawerApp isHovered={isHovered} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            lg: `calc(100% - ${drawerWidth.lg}px)`,
            xl: `calc(100% - ${drawerWidth.xl})`,
            md: `${drawerWidth.md}px`,
          },
        }}
      >
        {/********************ROUTES********************** */}
        <Toolbar
          sx={{
            display: {
              sm: "block",
              md: "none",
              lg: "none",
              xl: "none",
            },
          }}
        />
        <Routes>
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="vendors"
            element={
              <ProtectedRoute>
                <Vendors />
              </ProtectedRoute>
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
          <Route
            path="table"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Error />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </Box>
  )
}

const list = [
  {
    name: "Orders",
    icon: (
      <ShoppingCart sx={{ fontSize: { xl: "24px", lg: "27px", md: "27px" } }} />
    ),
    link: "/orders",
  },
  {
    name: "Vendors",
    icon: (
      <SupervisorAccount
        sx={{ fontSize: { xl: "24px", lg: "27px", md: "27px" } }}
      />
    ),
    link: "/vendors",
  }
]

const DrawerApp = ({ isHovered }) => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [message, setMessage] = React.useState("")

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const clearCache = async () => {
    try {
      const response = await  axios.delete(`${process.env.REACT_APP_API_URL}/users/clearCache`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })

      if (response.status === 200) {
        setMessage(response.data.message)
      }
    } catch (err) {
      setMessage("Error in clearing cache")
    }
  }

  return (
    <>
      <Stack
        sx={{ padding: "0.7rem" }}
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Avatar sx={{ bgcolor: blue[900], color: "white" }} aria-label="recipe">
          {localStorage.getItem("username")[0].toUpperCase()}
        </Avatar>
        <Typography
          variant="p"
          sx={{
            padding: "0",
            margin: "0",
            display: {
              lg: isHovered ? "block" : "none",
              xl: "block",
              md: isHovered ? "block" : "none",
            },
          }}
        >
          {localStorage.getItem("username")}
        </Typography>
      </Stack>
      <Divider />
      <List>
        {list.map((text, index) => (
          <Link key={index} to={text.link}>
            <ListItem
              sx={{
                backgroundColor:
                  location.pathname === text.link ? "#f21f10" : "",
              }}
              disablePadding
            >
              <ListItemButton
                sx={{
                  justifyContent: {
                    xl: "flex-start",
                    lg: "center",
                    md: "center",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    padding: { xl: 0, lg: "0.4rem 0", md: "0.4rem 0" },
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    display: {
                      md: isHovered ? "block" : "none",
                      lg: isHovered ? "block" : "none",
                      xl: "block",
                    },
                  }}
                  primary={text.name}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Link to="/table">
          <ListItem sx={{
            display: {
              xl : "none",
              lg : "none",
              md : "none",
              sm : "block"
            }
          }} disablePadding>
            <ListItemButton
              sx={{
                justifyContent: {
                  xl: "flex-start",
                  lg: "center",
                  md: "center",
                },
                backgroundColor:
                  location.pathname === "/table" ? "#f21f10" : "",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  padding: { xl: 0, lg: "0.4rem 0", md: "0.4rem 0" },
                }}
              >
                <TableChartOutlined
                  sx={{ fontSize: { xl: "24px", lg: "27px", md: "27px" } }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "white",
                  textDecoration: "none",
                  display: {
                    md: isHovered ? "block" : "none",
                    lg: isHovered ? "block" : "none",
                    xl: "block",
                  },
                }}
                primary="Table"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        {localStorage.getItem("role").includes("admin") ? (
          <Link to="/configuration">
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  justifyContent: {
                    xl: "flex-start",
                    lg: "center",
                    md: "center",
                  },
                  backgroundColor:
                    location.pathname === "/configuration" ? "#f21f10" : "",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    padding: { xl: 0, lg: "0.4rem 0", md: "0.4rem 0" },
                  }}
                >
                  <Settings
                    sx={{ fontSize: { xl: "24px", lg: "27px", md: "27px" } }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    display: {
                      md: isHovered ? "block" : "none",
                      lg: isHovered ? "block" : "none",
                      xl: "block",
                    },
                  }}
                  primary="Configuration"
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          <div></div>
        )}
        {localStorage.getItem("role") === "superadmin" ? (
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                justifyContent: {
                  xl: "flex-start",
                  lg: "center",
                  md: "center",
                },
              }}
              onClick={() => clearCache()}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  padding: { xl: 0, lg: "0.4rem 0", md: "0.4rem 0" },
                }}
              >
                <Memory
                  sx={{ fontSize: { xl: "24px", lg: "27px", md: "27px" } }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "white",
                  textDecoration: "none",
                  display: {
                    md: isHovered ? "block" : "none",
                    lg: isHovered ? "block" : "none",
                    xl: "block",
                  },
                }}
                primary="Update Cache"
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <div></div>
        )}
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              justifyContent: { xl: "flex-start", lg: "center", md: "center" },
            }}
            onClick={() => logout()}
          >
            <ListItemIcon
              sx={{
                color: "white",
                padding: { xl: 0, lg: "0.4rem 0", md: "0.4rem 0" },
              }}
            >
              <Logout
                sx={{ fontSize: { xl: "24px", lg: "27px", md: "27px" } }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "white",
                textDecoration: "none",
                display: {
                  md: isHovered ? "block" : "none",
                  lg: isHovered ? "block" : "none",
                  xl: "block",
                },
              }}
              primary="Logout"
            />
          </ListItemButton>
        </ListItem>
      </List>
      <AppSnackbar
        message={message}
        onClose={() => setMessage(false)}
        color="#2e7d32"
      />
    </>
  )
}

export default AppContainer
