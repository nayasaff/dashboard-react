import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppContainer = ({ children }) => {

    return(
        <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Drawer */}
        <Sidebar/>
        {/*App Bar */}
        <Header/>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    )
}

export default AppContainer;