import React from "react";
import { Link } from "react-router-dom";
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
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {list.map((text, index) => (
          <Link key={index} to={text.link}>
            <ListItem disablePadding>
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