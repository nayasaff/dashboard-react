import React from "react"
import AppContainer from "../components/AppContainer"
import { Container, Typography, TextField } from "@mui/material"

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
