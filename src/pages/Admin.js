import React, { useEffect, useState } from "react"
import AppContainer from "../components/AppContainer"
import { Box, Grid } from "@mui/material"
import UserCard from "../components/UserCard"
import axios from "axios"

const Admin = () => {
  
  const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchUsers = async()=>{
      try{
        const response = await axios.get("http://localhost:5000/users/",
        {
          headers: {
            "Authorization": localStorage.getItem("token"),
          }
        }
        )
        setUsers(response.data)
      }
      catch(error){
        console.log(error)
      }

    }
    fetchUsers()
  }, [])

  return (
    <AppContainer>
      <Box sx={{margin : '0 2rem'}}>
      {users ? <Grid container spacing={3}>
        {users.map(user => <Grid key={user._id} item xs={12} sm={6} md={4}>
          <UserCard user={user}/>
          </Grid>)}          
        </Grid> : <div>Loading...</div>}
        </Box>
    </AppContainer>
  )
}

export default Admin
