import React, { useEffect, useState } from "react"
import UserCard from "../components/user/UserCard"
import axios from "axios"
import UserModal from "../components/modal/UserModal"
import { useDispatch, useSelector } from "react-redux"
import { setUsers, setVendors } from "../redux/UserReducer"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import blue from "@mui/material/colors/blue";



const api_url = process.env.REACT_APP_API_URL

const Admin = () => {
  const state = useSelector((state) => state.users)
  const { users } = state

  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${api_url}/users/`, {
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
        .get(`${api_url}/users/vendors`, {
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
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography
          variant="h4"
          sx={{ margin: "1rem 2rem", fontWeight: "550"}}
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
