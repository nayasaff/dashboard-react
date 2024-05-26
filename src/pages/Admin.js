import React, { useEffect, useState } from "react"
import { Box, Grid, Stack, Typography } from "@mui/material"
import { Button } from "@mui/material"
import UserCard from "../components/user/UserCard"
import axios from "axios"
import UserModal from "../components/user/UserModal"
import { useDispatch, useSelector } from "react-redux"
import { setUsers, setVendors } from "../redux/UserReducer"
import { PersonAddAlt1 } from "@mui/icons-material"
import { blue } from "@mui/material/colors"

const Admin = () => {
  const state = useSelector((state) => state.users)
  const { users } = state

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

  useEffect(() => {
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

  if (!users) return <div>Loading...</div>

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Typography
          variant="h4"
          sx={{ margin: "1rem 2rem", fontWeight: "550" }}
        >
          Authorised Users
        </Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          endIcon={<PersonAddAlt1 />}
          sx={{
            bgcolor: blue[700],
            fontSize: {
              sm: "12px",
            },
            whiteSpace: "nowrap",
            maxHeight : {
              sm: "35px"
            }
          }}
          onClick={() => setOpenModal(true)}
        >
          Add User
        </Button>
      </Stack>
      <Box
        sx={{
          margin: {
            xl: "1rem 2rem",
            lg: "1rem 2rem",
            md: "0.7rem 1rem",
            sm: "0.5rem 0.5rem",
          },
          display: "flex",
          justifyContent: "center",
        }}
      >
        {users ? (
          <>
            <Grid container spacing={3}>
              {users.map((user) => (
                <Grid
                  sx={{ alignSelf: "center" }}
                  key={user._id}
                  item
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Box>
      {openModal && (
        <UserModal
          setUsers={setUsers}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  )
}

export default Admin
