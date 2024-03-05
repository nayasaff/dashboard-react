import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
import { SupervisorAccount, ShoppingCart, ContactPage } from "@mui/icons-material";

const drawerWidth = 240;

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

export default function Sidebar() {

  const location = useLocation()
  console.log(location.pathname) 

    return (
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
        display: {xs : 'none',  sm: "none", md: "block" },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {list.map((text, index) => (
          <Link key={index} to={text.link}>
            <ListItem sx={{backgroundColor : location.pathname === text.link ? '#f21f10' : ''}} disablePadding>
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
    );
}