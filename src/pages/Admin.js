import React, { useEffect, useState } from "react"
import { Box, Grid } from "@mui/material"
import { AddCircle } from "@mui/icons-material"
import UserCard from "../components/user/UserCard"
import axios from "axios"
import UserModal from "../components/user/UserModal"
import { useDispatch, useSelector } from "react-redux"
import { setUsers, setVendors } from "../redux/UserReducer"

const Admin = () => {
  const state = useSelector(state => state.users)
  const {users} = state

  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()


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
    <>
      <Box sx={{ margin: "1rem 2rem", display : 'flex', alignItems : 'center'}}>
        {users ? (
          <>
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid key={user._id} item xs={12} sm={6} md={4}>
                <UserCard user={user} />
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent : users.length % 3 === 0 ? "center" : "start" ,alignItems: 'center' }}>
            <AddCircle 
            onClick={() => setOpenModal(true)}
            color="primary"
            style={{ fontSize : '45px', cursor : 'pointer'}}/>
            </Grid>
          </Grid>

          </>
        ) : (
          <div>Loading...</div>
        )}
      </Box>
      {openModal && <UserModal setUsers={setUsers} openModal={openModal} setOpenModal={setOpenModal}/>}
    </>
  )
}

export default Admin
