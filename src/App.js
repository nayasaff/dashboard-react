import './App.css';
import Orders from './pages/Orders';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router,Routes, Route, Link} from "react-router-dom";
import Vendors from './pages/Vendors';
import {SupervisorAccount, ShoppingCart, ContactPage} from '@mui/icons-material'
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: '#17236A'
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
    'icon' : <ShoppingCart/>,
    "link" : "/"
  },
  {
    "name" : "Vendors",
    'icon' : <SupervisorAccount/>,
    "link" : "/vendors"
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
            color: 'white',
            backgroundColor: '#f44336'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar/>
        <Divider />
        <List>
          
          {list.map((text, index) => (
            <Link key={index} to={text.link}>
              <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color : "white"}}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText sx={{color : "white" , textDecoration : "none"}} primary={text.name} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <AppBar style={{backgroundColor : "white"}}>
        <div style={{display : "flex", justifyContent : "end", padding : '1rem 0'}}>

        </div>
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
