import React from "react"
import AppContainer from "../components/AppContainer"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"

const Edit = () => {
  return (
    <AppContainer>
      <Container>
        <Typography variant="h4">Edit User</Typography>
        <TextField  label="Outlined" variant="outlined" />
      </Container>
    </AppContainer>
  )
}

export default Edit
