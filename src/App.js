import logo from './logo.svg';
import './App.css';
import Orders from './pages/Orders';
import AppDrawer from './components/AppDrawer';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Vendors from './pages/Vendors';
import {SupervisorAccount, ShoppingCart, ContactPage} from '@mui/icons-material'
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f12939'
    },
    secondary: {
      main: '#f44336'
    }
  }

})

const drawerWidth = 240;

const list =[
  {
    'name' : "Orders",
    'icon' : <ShoppingCart/>
  },
  {
    "name" : "Vendors",
    'icon' : <SupervisorAccount/>
  },
  {
    "name" : "Contact",
    "icon" : <ContactPage/>
  }
]


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          
          {list.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AppBar color='secondary'>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Routes>

          <Route path="/" element={<Orders/>}/>
          <Route path="/vendors" element={<Vendors/>}/>
          </Routes>
      </Box>

    </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App;
