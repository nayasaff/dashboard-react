import React, { useState } from "react"
import { Modal as BaseModal } from "@mui/base/Modal"
import { styled, css } from "@mui/system"
import Fade from "@mui/material/Fade"
import { Button } from "@mui/base/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import {
  Typography,
  Stack,
  Button as MuiButton,
  Autocomplete
} from "@mui/material"
import Chip from "@mui/material/Chip"
import axios from "axios"
import { addUser, updateUser } from "../redux/UserReducer"
import { useDispatch, useSelector } from "react-redux"


const UserModal = ({ openModal, setOpenModal, isEditable, user }) => {
  const [value, setValue] = useState(null)
  const [selectedVendors, setSelectedVendors] = useState(isEditable ? user.vendors : [])

  const state = useSelector((state) => state.users)
  const {vendors} = state

  const [username, setUsername] = useState(isEditable ? user.username : "")
  const [usernameError, setUsernameError] = useState(false)
  const [password, setPassword] = useState(isEditable ? "*******" : "")

  const dispatch = useDispatch()


  const handleChange = (newValue) => {
    setValue("")
    setSelectedVendors((prev) => {
      if (prev.includes(newValue)) return prev
      return [...prev, {"_id" : newValue['_id'], "name" : newValue['name'] } ]
    })
  }

  const handleDelete = (value) => {
    setSelectedVendors((prev) => prev.filter((val) => val !== value))
  }

  const createUser = async() => {

    if(!username){
        setUsernameError("Username is required")
        return
    }

    try{
        const response = await axios.post("http://localhost:5000/users/create", {username, password, vendors : selectedVendors}, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        if(response.status === 200){
          setOpenModal(false)
          dispatch(addUser(response.data))
        }
    }
    catch(err){
        console.log(err)
    }
  }

  const editUser = async() => {
    try{
        const response = await axios.patch(`http://localhost:5000/users/edit/${user._id}`, {username, vendors : selectedVendors}, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        if(response.status === 200){
          setOpenModal(false)
          dispatch(updateUser(response.data))
        }
    }
    catch(err){
        console.log(err)
    }
  }


  if(!vendors)
  return <div></div>

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={() => setOpenModal(false)}
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={openModal}>
        <ModalContent sx={style}>
          <h2
            id="transition-modal-title"
            className="modal-title"
            style={{ marginBottom: "1.5rem" }}
          >
            {isEditable ? "Edit User" : "Create User"}
          </h2>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              mb: "1rem",
            }}
          >
            <Typography sx={{ width: "100px" }}>Username</Typography>
            <TextField
              fullWidth
              label="Username"
              type="text"
              size="small"
              value={username}
              error={usernameError}
              helperText={usernameError}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              mb: "1rem",
            }}
          >
            <Typography sx={{ width: "100px" }}>Password</Typography>
            <TextField
              fullWidth
              label="Password"
              type="text"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Stack
            direction="row"
            spacing={1}
            style={{ marginBottom: "0.25rem", marginLeft: "85px" }}
          >
            {selectedVendors.length > 0 &&
              selectedVendors.map((selectedValue) => (
                <Chip
                key={selectedValue._id}
                  label={selectedValue.name.en}
                  onDelete={() => handleDelete(selectedValue)}
                  color="primary"
                  variant="outlined"
                />
              ))}
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              mb: "1rem",
            }}
          >
            <Typography sx={{ width: "100px" }}>Vendors</Typography>
             <Autocomplete
              fullWidth
              onChange={(event, newValue) => handleChange(newValue)}
              options={vendors}
              getOptionLabel={(option) => option['name']['en']}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vendors"
                  size="small"
                  fullWidth
                  variant="outlined"
                  clearIcon={null}
                  value={value}
                />
              )}
            /> 
          </Box>
          <Stack direction="row" justifyContent="end" spacing={1} sx={{flexWrap : 'wrap'}}>
            <MuiButton
              variant="outlined"
              size="small"
              sx={{ color: "black" }}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </MuiButton>
            <MuiButton
              variant="contained"
              size="small"
              sx={{ bgcolor: blue[700] }}
                onClick={()=> isEditable ? editUser() : createUser()}
            >
              {isEditable ? "Edit" : "Create"}
            </MuiButton>
          </Stack>
        </ModalContent>
      </Fade>
    </Modal>
  )
}

const Backdrop = React.forwardRef(function Backdrop({ open, ...other }, ref) {
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  )
})

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
}

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
}

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
)

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
)

export default UserModal
