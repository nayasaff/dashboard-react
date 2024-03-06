import React from "react"
import { Link, useLocation } from "react-router-dom"
//MUI Components
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Slider from "@mui/material/Slider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
//MUI Icons
import ShoppingCart from "@mui/icons-material/ShoppingCart"
import SupervisorAccount from "@mui/icons-material/SupervisorAccount"
import ContactPage from "@mui/icons-material/ContactPage"
import Menu from '@mui/icons-material/Menu'
//Styling Mui component
import { styled } from "@mui/material/styles"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
//Rexux reducer
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setNumber, setStartDate } from '../redux/Reducer';

const drawerWidth = 240

const list = [
  {
    name: "Orders",
    icon: <ShoppingCart />,
    link: "/",
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
]

const PrettoSlider = styled(Slider)({
    color: "#17236A",
    height: 6,
    //Slider track (the line that the thumb moves along)
    "& .MuiSlider-track": {
      border: "none",
    },
    //Slider thumb (the circle that moves around the slider)
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      boxShadow: 'inherit', // Always show shadow
      '&::before': {
        display: 'none',
      },
    },
    //Slider value label (the number that appears on the thumb)
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 24,
      height: 24,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#17236A",
      transformOrigin: "bottom left",
      transform: "translate(50%, -70%) rotate(-45deg) scale(0)",
      "&::before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -70%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  })
  

const AppContainer = ({ children }) => {
  const location = useLocation()

  const state = useSelector((state) => state);

  const { number, startDate, endDate } = state;
  const dispatch = useDispatch()

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
        <Toolbar />
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
      <LocalizationProvider dateAdapter={AdapterDayjs}> {/* This is for date picker */}
    <AppBar sx={{ backgroundColor: "white", color: "black" }}>
    <Box
      sx={{
        paddingLeft:  `${drawerWidth + 7}px`,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
        {/**Count number that show how many bar chart */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "2rem"}}
      >
        <Menu sx={{ cursor : 'pointer', fontSize : '25px' }}/>
        <Typography sx={{marginTop : '0.5rem'}} variant="h5">Count</Typography>
        <div
          style={{
            width: "15rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop : '1rem'
          }}
        >
            {/*Minimum is one*/}
          <span>1</span>{" "}
          <PrettoSlider
            aria-label="pretto slider"
            min={1}
            max={25}
            value={number}
            onChange={(e) => dispatch(setNumber(e.target.value))}
            valueLabelDisplay="on"
          />
            {/*Maximum is 25*/}
          <span>25</span>
        </div>
      </div>
      {/*Date range (start date and end date) to display orders in that range */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          padding : '1rem 0.5rem'
        }}
      >
        {/*Start date*/}
        <DatePicker label="Start Date"
        value={startDate}
        slotProps={{ textField: { size: 'small' } }}
        onChange={(newValue) => dispatch(setStartDate(newValue))}
        />
        {/*End date*/}
        <DatePicker label="End Date"
        value={endDate} //get current date
        slotProps={{ textField: { size: 'small' } }}
        onChange={(newValue) => dispatch(setEndDate(newValue))}
        />
      </div>
    </Box>
  </AppBar>
   </LocalizationProvider>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children} {/*This is where the children components are rendered*/}
      </Box>
    </Box>
  )
}

export default AppContainer
