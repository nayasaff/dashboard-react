import React, { useEffect, useState } from "react"
import AppContainer from "../components/AppContainer"
import { Box, Grid, TextField, InputAdornment, Typography } from "@mui/material"
import Search from "@mui/icons-material/Search"
import { Clear, AddCircle } from "@mui/icons-material"
import UserCard from "../components/UserCard"
import axios from "axios"
import { red, blue } from "@mui/material/colors"
import UserModal from "../components/UserModal"
import { useDispatch, useSelector } from "react-redux"
import { setUsers, setVendors } from "../redux/UserReducer"

const Admin = () => {
  const state = useSelector(state => state.users)
  const {users} = state
  const [showClearIcon, setShowClearIcon] = useState("none")

  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex")
  }

  const handleClick = () => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...")
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        dispatch(setUsers(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])


  useEffect(()=>{
    try {
      axios
        .get("http://localhost:5000/users/vendors", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => dispatch(setVendors(response.data)))
        .catch((error) => console.log(error))
    } catch (error) {}
  }, [])

  if(!users) return <div>Loading...</div>

  return (
    <AppContainer>
      <Box sx={{ margin: "1rem 2rem", display : 'flex', alignItems : 'center'}}>
        {users ? (
          <>
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid key={user._id} item xs={12} sm={6} md={4}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
          <AddCircle 
            onClick={() => setOpenModal(true)}
            color="primary"
            style={{ alignSelf : 'center', justifySelf : 'center' ,fontSize : '45px', cursor : 'pointer'}}/>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Box>
      <UserModal setUsers={setUsers} openModal={openModal} setOpenModal={setOpenModal}/>
    </AppContainer>
  )
}

export default Admin
